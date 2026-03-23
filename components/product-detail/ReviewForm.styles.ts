import styled from 'styled-components'

export const FormWrapper = styled.div`
  padding-top: 32px;
`

export const FormHeading = styled.h3`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textDark};
  letter-spacing: 1px;
  text-transform: uppercase;
  opacity: 0.5;
  margin-bottom: 20px;
`

export const StarRow = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 20px;
`

export const StarButton = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: 24px;
  line-height: 1;
  color: ${({ $active, theme }) => ($active ? theme.colors.textDark : theme.colors.borderMuted)};
  transition: color 0.1s ease;
`

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
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
  padding: 8px 0;
  width: 100%;
  letter-spacing: 0.3px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textDark};
    opacity: 0.4;
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
  padding: 8px 0;
  width: 100%;
  resize: vertical;
  min-height: 80px;
  letter-spacing: 0.3px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textDark};
    opacity: 0.4;
  }

  &:focus {
    border-bottom-color: ${({ theme }) => theme.colors.textDark};
  }
`

export const SubmitBtn = styled.button<{ $loading: boolean }>`
  width: 100%;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.btnDark};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  cursor: ${({ $loading }) => ($loading ? 'not-allowed' : 'pointer')};
  opacity: ${({ $loading }) => ($loading ? 0.7 : 1)};
  transition: opacity 0.2s ease;
  margin-top: 8px;
`

export const SuccessMessage = styled.p`
  font-size: 14px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.textDark};
  line-height: 1.7;
  padding: 24px 0;
`

export const ErrorMessage = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.warningAmber};
  margin-top: 8px;
`

export const HoneypotField = styled.div`
  position: absolute;
  opacity: 0;
  pointer-events: none;
  height: 0;
  overflow: hidden;
`
