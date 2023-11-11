import { useState } from "react";
import TreeView from "react-accessible-treeview";
import { Button } from "reactstrap";


export function DirectoryTreeView({ loadChildren = async () => { }, name = "", classNameContainer }) {

  const [data, setData] = useState(
    [
      {
        name: "/",
        id: 0,
        children: [-1],
        parent: null,
      },
      {
        name,
        id: -1,
        children: [],
        parent: 0,
        isBranch: true,
      }
    ]
  );
  // const [nodesAlreadyLoaded, setNodesAlreadyLoaded] = useState([]);

  const updateTreeData = (list, id, children) => {
    const data = list.map((node) => {
      if (node.id === id) {
        node.children = children.map((el) => {
          return el.id;
        });
      }
      return node;
    });
    return data.concat(children);
  };

  const onLoadData = async ({ element }) => {
    if (element.children.length > 0) {
      return;
    }

    const newData = await loadChildren(element.id === -1 ? null : element.id);

    setData((value) =>
      updateTreeData(value, element.id, newData)
    );


  };

  return (
    <div>
      <div className={`directory bg-dark ${classNameContainer}`}>
        <TreeView
          onLoadData={onLoadData}
          data={data}
          aria-label="directory tree"
          nodeRenderer={({
            element,
            isBranch,
            isExpanded,
            getNodeProps,
            level,
            handleExpand,
            handleSelect
          }) => {
            const branchNode = (isExpanded, element) => {
              return isExpanded && element.children.length === 0 ? (
                <>
                  <span
                    role="alert"
                    aria-live="assertive"
                    className="visually-hidden"
                  >
                    loading {element.name}
                  </span>
                  {/* <i
                    aria-hidden={true}
                    className="loading-icon bi bi-hourglass"
                  /> */}
                </>
              ) : (
                null
              );
            };

            return (
              <div {...getNodeProps({ onClick: handleExpand })} style={{ paddingLeft: 10 * (level - 1) }}>
                {isBranch && branchNode(isExpanded, element)}
                {isBranch ? (
                  <FolderIcon isOpen={isExpanded} />
                ) : (
                  <FileIcon extension={"html"} />
                )}
                {element.name}

                {/* {!isBranch ? (<>
                  <Button color="link" onClick={(e) => {
                    e.stopPropagation();
                  }}><i className="bi bi-pen-fill" /></Button>

                  <Button color="link" onClick={(e) => {
                    e.stopPropagation();
                  }}><i className="bi bi-copy" /></Button>

                  <Button color="link" onClick={(e) => {
                    e.stopPropagation();
                  }}><i className="bi bi-share-fill" />
                  </Button>


                </>) : null}

                <Button color="link" onClick={(e) => {
                  e.stopPropagation();
                }}><i className="bi bi-arrows-move" /></Button>

                <Button color="link" onClick={(e) => {
                  e.stopPropagation();
                }}><i className="bi bi-trash-fill" /></Button> */}

                <Button color="link" onClick={(e) => {
                  // handleSelect(e)
                  e.stopPropagation();
                }}><i className="bi bi-box-arrow-in-up-right" /></Button>


              </div>
            )
          }}
        />
      </div>
    </div>
  );
}

const FolderIcon = ({ isOpen }) =>
  isOpen ? (
    <i className="bi bi-folder2-open" />
  ) : (
    <i className="bi bi-folder2" />
  );

const FileIcon = ({ extension }) => {
  let fileIconClass = "";
  switch (extension) {
    case "html": fileIconClass = "bi bi-filetype-html"; break;
    case "txt": fileIconClass = "bi bi-filetype-txt"; break;
    default: fileIconClass = "bi bi-file-earmark";
  }
  return <i className={fileIconClass} />
};
