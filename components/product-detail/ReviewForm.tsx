'use client'

import { useState } from 'react'
import {
  FormWrapper,
  FormHeading,
  StarRow,
  StarButton,
  FieldGroup,
  FormInput,
  FormTextarea,
  SubmitBtn,
  SuccessMessage,
  ErrorMessage,
  HoneypotField,
} from './ReviewForm.styles'

interface Labels {
  heading: string
  namePlaceholder: string
  emailPlaceholder: string
  textPlaceholder: string
  starLabel: (n: number) => string
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
}

type FormState = 'idle' | 'submitting' | 'success' | 'error'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ReviewForm({ productId, locale, labels }: Props) {
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [quote, setQuote] = useState('')
  const [honeypot, setHoneypot] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrorMsg('')

    if (rating < 1 || !name.trim() || !EMAIL_REGEX.test(email) || quote.trim().length < 20) {
      setErrorMsg(labels.errorGeneric)
      return
    }

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
        <SuccessMessage>{labels.success}</SuccessMessage>
      </FormWrapper>
    )
  }

  const displayRating = hoveredRating || rating

  return (
    <FormWrapper>
      <FormHeading>{labels.heading}</FormHeading>
      <form onSubmit={handleSubmit}>
        <StarRow>
          {[1, 2, 3, 4, 5].map((n) => (
            <StarButton
              key={n}
              type="button"
              $active={n <= displayRating}
              aria-label={labels.starLabel(n)}
              onClick={() => setRating(n)}
              onMouseEnter={() => setHoveredRating(n)}
              onMouseLeave={() => setHoveredRating(0)}
            >
              ★
            </StarButton>
          ))}
        </StarRow>

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
          <FormInput
            type="text"
            placeholder={labels.namePlaceholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={100}
            required
          />
          <FormInput
            type="email"
            placeholder={labels.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FormTextarea
            placeholder={labels.textPlaceholder}
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            minLength={20}
            maxLength={1000}
            required
          />
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
