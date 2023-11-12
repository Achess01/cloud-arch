import { Card, ListGroup, ListGroupItem } from "reactstrap"
import { Link } from "react-router-dom"
import { Directory } from "src/components/Directory"

export const Folder = ({ items = [], basePath = "", parentId = undefined, previous = undefined, loadData = () => { }, moveElement = () => { } }) => {
  return (
    <Card
      className="w-100 my-3"
    >
      <ListGroup flush>
        {parentId ? (
          <ListGroupItem>
            <Link to={previous ? `${basePath}/${previous}` : basePath}>
              ..
            </Link>
          </ListGroupItem>
        ) : null}

        {items.map((item) => (
          <ListGroupItem key={item._id}>
            <Directory element={item} isFile={item.isFile} to={`${basePath}/${item._id}`} loadData={loadData} moveElement={moveElement} />
          </ListGroupItem>
        ))}
      </ListGroup>
      {items.length < 1 ? <h4 className="text-muted text-center my-5">Directorio vacío.</h4> : null}
    </Card>
  )
}