import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { SmallContainer } from "src/components/Container";
import { Folder } from "./Folder";
import { directoryService, fileService } from "src/config/apiClient";
import { FolderIcon } from "src/components/Icons";
import { MoveElementModal } from "./Components/MoveElement";


export const RootDir = () => {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [dirData, setDirData] = useState({});
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const toggle = () => setOpenModal(value => !value)
  const [currentElement, setCurrentElement] = useState({})

  const moveElement = (element) => {
    setOpenModal(true)
    setCurrentElement(element)
  }

  const loadData = async (id) => {
    try {
      setLoading(true)

      const resultDir = id ? await directoryService.get(id) : {}
      setDirData(resultDir)

      const resultDirectories = await directoryService.find({
        query: {
          $limit: 50,
          is_trash: false,
          parent_id: id ?? { $exists: false },
          $sort: {
            name: 1
          }
        }
      })

      const resultFiles = await fileService.find({
        query: {
          $limit: 50,
          is_trash: false,
          is_shared: { $ne: true },
          parent_id: id ?? { $exists: false },
          $sort: {
            name: 1
          }
        }
      })
      setItems([...resultDirectories.data, ...resultFiles.data.map((file) => ({ ...file, isFile: true }))])
    } catch (error) {
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData(id)
  }, [id])

  return (
    <SmallContainer loading={loading} className="my-5">
      <MoveElementModal toggle={toggle} isOpen={openModal} item={currentElement} loadData={() => loadData(id)} />
      <h2>Mis archivos <FolderIcon /></h2>
      <Folder
        items={items}
        basePath="/folder/root"
        previous={dirData.parent_id}
        parentId={id}
        loadData={() => loadData(id)}
        moveElement={moveElement}
      />
    </SmallContainer>
  )
}