import { faPlay, faPause, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const PlayIcon = ({ isPlaying, isLoading }) => {
  let icon = isPlaying ? faPause : faPlay
  if (isLoading) {
    icon = faSpinner
  }
  return (
    <FontAwesomeIcon size="xl" icon={icon} spin={isLoading} />
  )
}

export default PlayIcon
