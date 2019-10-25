import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default isPlaying => (
  <FontAwesomeIcon size="sm" icon={isPlaying ? faPause : faPlay} />
)
