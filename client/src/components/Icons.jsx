const BaseIcon = ({ iconClass, className = "" }) => (
  <i className={`bi ${iconClass} ${className}`} />
)

export const PencilSquareIcon = ({ className = "" }) => (<BaseIcon iconClass="bi-pencil-square" className={className} />)
export const TrashIcon = ({ className = "" }) => (<BaseIcon iconClass="bi-trash3-fill" className={className} />)
export const HourGlassIcon = ({ className = "" }) => (<BaseIcon iconClass="bi-hourglass" className={className} />)
export const PenIcon = ({ className = "" }) => (<BaseIcon iconClass="bi-pen-fill" className={className} />)
export const CopyIcon = ({ className = "" }) => (<BaseIcon iconClass="bi-copy" className={className} />)
export const ShareIcon = ({ className = "" }) => (<BaseIcon iconClass="bi-share-fill" className={className} />)
export const ArrowsMoveIcon = ({ className = "" }) => (<BaseIcon iconClass="bi-arrows-move" className={className} />)
export const TrashFillIcon = ({ className = "" }) => (<BaseIcon iconClass="bi-trash-fill" className={className} />)
export const ArrowBoxUpIcon = ({ className = "" }) => (<BaseIcon iconClass="bi-box-arrow-in-up-right" className={className} />)
export const FolderOpenIcon = ({ className = "" }) => (<BaseIcon iconClass="bi-folder2-open" className={className} />)
export const FolderIcon = ({ className = "" }) => (<BaseIcon iconClass="bi-folder2" className={className} />)
export const HtmlIcon = ({ className = "" }) => (<BaseIcon iconClass="bi-filetype-html" className={className} />)
export const TxtIcon = ({ className = "" }) => (<BaseIcon iconClass="bi-filetype-txt" className={className} />)
export const EyeFillIcon = ({ className = "" }) => (<BaseIcon iconClass="bi-eye-fill" className={className} />)