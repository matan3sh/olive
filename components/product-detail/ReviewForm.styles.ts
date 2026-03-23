import styled from 'styled-components'

export const FormWrapper = styled.div`
  padding-top: 28px;
`

export const FormHeading = styled.h3`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textDark};
  letter-spacing: 1px;
  text-transform: uppercase;
  opacity: 0.5;
  margin-bottom: 24px;
`

export const StarRow = styled.div`
  display: flex;
  gap: 2px;
  margin-bottom: 24px;
`

export const StarButton = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  padding: 2px;
  cursor: pointer;
  font-size: 28px;
  line-height: 1;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.warningAmber : theme.colors.borderMuted};
  transition: color 0.12s ease, transform 0.1s ease;
  display: inline-flex;
  align-items: center;

  &:hover {
    color: ${({ theme }) => theme.colors.warningAmber};
    transform: scale(1.15);
  }
`

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
`

export const FormInput = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderMuted};
  outline: none;
  font-family: ${({ theme }) => theme.fonts.inter};
  font-size: 14px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.textDark};
  background: transparent;
  padding: 10px 0;
  width: 100%;
  letter-spacing: 0.3px;
  transition: border-bottom-color 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textDark};
    opacity: 0.35;
  }

  &:focus {
    border-bottom-color: ${({ theme }) => theme.colors.textDark};
  }
`

export const FormTextarea = styled.textarea`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderMuted};
  outline: none;
  font-family: ${({ theme }) => theme.fonts.inter};
  font-size: 14px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.textDark};
  background: transparent;
  padding: 10px 0;
  width: 100%;
  resize: vertical;
  min-height: 90px;
  letter-spacing: 0.3px;
  line-height: 1.7;
  transition: border-bottom-color 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textDark};
    opacity: 0.35;
  }

  &:focus {
    border-bottom-color: ${({ theme }) => theme.colors.textDark};
  }
`

export const SubmitBtn = styled.button<{ $loading: boolean }>`
  width: 100%;
  height: 52px;
  background-color: ${({ theme }) => theme.colors.btnDark};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: ${({ $loading }) => ($loading ? 'not-allowed' : 'pointer')};
  opacity: ${({ $loading }) => ($loading ? 0.6 : 1)};
  transition: opacity 0.2s ease, background-color 0.2s ease;
  margin-top: 4px;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.textDark};
  }
`

export const SuccessMessage = styled.div`
  padding: 28px 0 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const SuccessIcon = styled.span`
  font-size: 22px;
  color: ${({ theme }) => theme.colors.warningAmber};
  letter-spacing: 0;
`

export const SuccessText = styled.p`
  font-size: 14px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.textDark};
  line-height: 1.75;
  opacity: 0.8;
`

export const FieldItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const FieldError = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.warningAmber};
  letter-spacing: 0.3px;
`

export const ErrorMessage = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.warningAmber};
  letter-spacing: 0.3px;
  margin-top: 10px;
`

export const HoneypotField = styled.div`
  position: absolute;
  opacity: 0;
  pointer-events: none;
  height: 0;
  overflow: hidden;
`
