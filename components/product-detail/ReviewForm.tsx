'use client'

import { useState } from 'react'
import {
  FormWrapper,
  FormHeading,
  StarRow,
  StarButton,
  FieldGroup,
  FieldItem,
  FieldError,
  FormInput,
  FormTextarea,
  SubmitBtn,
  SuccessMessage,
  SuccessIcon,
  SuccessText,
  ErrorMessage,
  HoneypotField,
} from './ReviewForm.styles'

interface Labels {
  heading: string
  namePlaceholder: string
  emailPlaceholder: string
  textPlaceholder: string
  starLabel: (n: number) => string
  starRequired: string
  nameRequired: string
  emailRequired: string
  quoteRequired: string
  submit: string
  submitting: string
  success: string
  errorGeneric: string
  errorDuplicate: string
  errorRateLimit: string
}

interface Props {
  productId: string
  locale: string
  labels: Labels
  showHeading?: boolean
}

type FormState = 'idle' | 'submitting' | 'success' | 'error'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ReviewForm({ productId, locale, labels, showHeading = true }: Props) {
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [quote, setQuote] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [fieldErrors, setFieldErrors] = useState({ rating: '', name: '', email: '', quote: '' })

  function validate() {
    const errors = { rating: '', name: '', email: '', quote: '' }
    if (rating < 1) errors.rating = labels.starRequired
    if (!name.trim()) errors.name = labels.nameRequired
    if (!EMAIL_REGEX.test(email)) errors.email = labels.emailRequired
    if (quote.trim().length < 20) errors.quote = labels.quoteRequired
    return errors
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrorMsg('')

    const errors = validate()
    if (errors.rating || errors.name || errors.email || errors.quote) {
      setFieldErrors(errors)
      return
    }
    setFieldErrors({ rating: '', name: '', email: '', quote: '' })

    setFormState('submitting')

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product: productId,
          author: name.trim(),
          email: email.trim().toLowerCase(),
          rating,
          quote: quote.trim(),
          locale,
          website: honeypot,
        }),
      })

      if (res.status === 201) {
        setFormState('success')
        return
      }
      if (res.status === 409) {
        setErrorMsg(labels.errorDuplicate)
      } else if (res.status === 429) {
        setErrorMsg(labels.errorRateLimit)
      } else {
        setErrorMsg(labels.errorGeneric)
      }
      setFormState('error')
    } catch {
      setErrorMsg(labels.errorGeneric)
      setFormState('error')
    }
  }

  if (formState === 'success') {
    return (
      <FormWrapper>
        <SuccessMessage>
          <SuccessIcon>★</SuccessIcon>
          <SuccessText>{labels.success}</SuccessText>
        </SuccessMessage>
      </FormWrapper>
    )
  }

  const displayRating = hoveredRating || rating

  return (
    <FormWrapper>
      {showHeading && <FormHeading>{labels.heading}</FormHeading>}
      <form onSubmit={handleSubmit} noValidate>
        <FieldItem>
          <StarRow>
            {[1, 2, 3, 4, 5].map((n) => (
              <StarButton
                key={n}
                type="button"
                $active={n <= displayRating}
                aria-label={labels.starLabel(n)}
                onClick={() => { setRating(n); setFieldErrors((p) => ({ ...p, rating: '' })) }}
                onMouseEnter={() => setHoveredRating(n)}
                onMouseLeave={() => setHoveredRating(0)}
              >
                ★
              </StarButton>
            ))}
          </StarRow>
          {fieldErrors.rating && <FieldError>{fieldErrors.rating}</FieldError>}
        </FieldItem>

        <HoneypotField aria-hidden="true">
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </HoneypotField>

        <FieldGroup>
          <FieldItem>
            <FormInput
              type="text"
              placeholder={labels.namePlaceholder}
              value={name}
              onChange={(e) => { setName(e.target.value); setFieldErrors((p) => ({ ...p, name: '' })) }}
              maxLength={100}
            />
            {fieldErrors.name && <FieldError>{fieldErrors.name}</FieldError>}
          </FieldItem>
          <FieldItem>
            <FormInput
              type="email"
              placeholder={labels.emailPlaceholder}
              value={email}
              onChange={(e) => { setEmail(e.target.value); setFieldErrors((p) => ({ ...p, email: '' })) }}
            />
            {fieldErrors.email && <FieldError>{fieldErrors.email}</FieldError>}
          </FieldItem>
          <FieldItem>
            <FormTextarea
              placeholder={labels.textPlaceholder}
              value={quote}
              onChange={(e) => { setQuote(e.target.value); setFieldErrors((p) => ({ ...p, quote: '' })) }}
              maxLength={1000}
            />
            {fieldErrors.quote && <FieldError>{fieldErrors.quote}</FieldError>}
          </FieldItem>
        </FieldGroup>

        {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}

        <SubmitBtn
          type="submit"
          $loading={formState === 'submitting'}
          disabled={formState === 'submitting'}
        >
          {formState === 'submitting' ? labels.submitting : labels.submit}
        </SubmitBtn>
      </form>
    </FormWrapper>
  )
}
