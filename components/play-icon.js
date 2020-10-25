import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const PlayIcon = ({ isPlaying }) => <FontAwesomeIcon size="sm" icon={isPlaying ? faPause : faPlay} />;

export default PlayIcon;
