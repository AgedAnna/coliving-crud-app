import React from "react";
import { Modal, Typography } from "antd";
import { Pessoa } from "../services/interface";
import styles from "./styles.module.css";

interface DeleteUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  user?: Pessoa;
  onConfirm: (userId: string) => void;
}

const { Text } = Typography;

const DeleteUserDialog: React.FC<DeleteUserDialogProps> = ({
  isOpen,
  onClose,
  user,
  onConfirm,
}) => {
  const handleDelete = () => {
    if (user?.id) {
      onConfirm(user.id);
    }
  };

  return (
    <Modal
      title="Excluir Usuário"
      visible={isOpen}
      onOk={handleDelete}
      onCancel={onClose}
      okText="Excluir"
      cancelText="Cancelar"
      okButtonProps={{
        className: styles.buttonEdit,
      }}
    >
      <Text>
        Deseja realmente excluir o usuário <strong>{user?.nome}</strong>?
      </Text>
    </Modal>
  );
};

export default DeleteUserDialog;
