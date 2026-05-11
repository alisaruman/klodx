import {
  Alert,
  Box,
  AlertTitle,
  CloseButton,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react"

interface Props {
  status?: "warning" | "success" | "loading" | "info" | "error"
  title?: string
  onClose?: () => void
}

const AlertComponent = ({ status, title, onClose }: Props) => {
  return (
    <Alert status={status} variant={status}>
      <Box
        as="i"
        className={useColorModeValue(
          `icon-alert-${status}`,
          `icon-alert-${status}-dark`,
        )}
        boxSize={6}
        ml={2}
      />
      <AlertTitle>{title}</AlertTitle>
      <CloseButton onClick={onClose} variant={status} />
    </Alert>
  )
}

export default AlertComponent
