import { directoryService, fileService } from "src/config/apiClient";
import { handleError } from "src/utils/handleError";
import Swal from "sweetalert2";

export const deleteItem = ({ _id, name, extension, isFile }, cb) => {
  const service = isFile ? fileService : directoryService;
  const message = isFile
    ? `¿Está seguro que desea eliminar el archivo ${name}.${extension}?`
    : `¿Está seguro que desea eliminar el directorio ${name}?`;

  Swal.fire({
    title: "Eliminar",
    text: message,
    showCancelButton: true,
    showDenyButton: true,
    confirmButtonText: "Sí",
    confirmButtonColor: "#212529",
    denyButtonText: "No",
    cancelButtonText: "Cancelar",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await service.remove(_id);
        console.log(response);
        Swal.fire({
          icon: "success",
          title: "Eliminado con éxito",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        handleError(error, "Oops...");
      } finally {
        cb();
      }
    }
  });
};

export const moveItem = (item, newParentId, cb) => {
  const { name, _id, extension, isFile } = item;
  const service = isFile ? fileService : directoryService;
  const message = isFile
    ? `¿Está seguro que desea mover el archivo ${name}.${extension}?`
    : `¿Está seguro que desea mover el directorio ${name}?`;

  Swal.fire({
    title: "Mover",
    text: message,
    showCancelButton: true,
    showDenyButton: true,
    confirmButtonText: "Sí",
    confirmButtonColor: "#212529",
    denyButtonText: "No",
    cancelButtonText: "Cancelar",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const body = {};
        if (newParentId) body.parent_id = newParentId;
        else {
          body.$unset = { parent_id: 1 };
        }

        await service.patch(_id, body);

        Swal.fire({
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        handleError(error, "Oops...");
      } finally {
        cb();
      }
    }
  });
};
