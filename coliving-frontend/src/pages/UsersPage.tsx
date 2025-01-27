import React, { useEffect, useState } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import {
  atualizarPessoa,
  criarPessoa,
  deletarPessoa,
  importarPessoas,
  listarPessoas,
} from "../services/pessoas";
import styles from "./styles.module.css";
import EditUserDialog from "./EditUserDialog";
import {
  EditOutlined,
  PlusOutlined,
  SyncOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import DeleteUserDialog from "./DeleteUserDialog";
import { notification } from "antd";
import CreateUserDialog from "./CreateUserDialog";
import { Pessoa } from "../services/interface";
import Filters from "./Filters";

const UsersPage: React.FC = () => {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Pessoa | undefined>();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [api, contextHolder] = notification.useNotification();

  const getPessoas = async (appliedFilters = {}) => {
    try {
      const data = await listarPessoas(appliedFilters);
      setPessoas(data);
      setIsLoaded(true);
    } catch (error: any) {
      console.error("Erro ao listar pessoas:", error);
      api.error({
        message: "Erro ao Listar Pessoas",
        description: error.message || "Verifique o console para mais detalhes.",
        placement: "topRight",
        duration: 5,
      });
    }
  };

  useEffect(() => {
    getPessoas();
  }, []);

  const handleApplyFilters = (appliedFilters: any) => {
    getPessoas(appliedFilters);
  };

  const handleCreateUser = () => {
    setIsCreateOpen(true);
  };

  const closeCreateDialog = () => {
    setIsCreateOpen(false);
  };

  const handleCreate = async (
    newUser: Omit<Pessoa, "id" | "dataDeCadastro">
  ) => {
    try {
      const createdUser = await criarPessoa(newUser);
      setPessoas((prev) => [createdUser, ...prev]);

      api.success({
        message: "Sucesso",
        description: `Usuário ${createdUser.nome} criado com sucesso!`,
        placement: "topRight",
        duration: 3,
      });
    } catch (error: any) {
      console.error("Erro ao criar usuário:", error);
      api.error({
        message: "Erro ao Criar Usuário",
        description: error.message || "Verifique o console para mais detalhes.",
        placement: "topRight",
        duration: 5,
      });
    } finally {
      closeCreateDialog();
    }
  };

  const handleEdit = (user: Pessoa) => {
    setSelectedUser(user);
    setIsEditOpen(true);
  };

  const handleDelete = (user: Pessoa) => {
    setSelectedUser(user);
    setIsDeleteOpen(true);
  };

  const closeEditDialog = () => {
    setIsEditOpen(false);
    setSelectedUser(undefined);
  };

  const closeDeleteDialog = () => {
    setIsDeleteOpen(false);
    setSelectedUser(undefined);
  };

  const handleSaveEdit = async (updatedUser: Pessoa) => {
    try {
      const editedUser = await atualizarPessoa(updatedUser.id!, {
        nome: updatedUser.nome,
        email: updatedUser.email,
        telefone: updatedUser.telefone,
        tipo: updatedUser.tipo,
      });

      setPessoas((prev) =>
        prev.map((p) => (p.id === editedUser.id ? editedUser : p))
      );

      api.success({
        message: "Sucesso",
        description: `Edição de ${editedUser.nome} salva com sucesso!`,
        placement: "topRight",
        duration: 3,
      });
    } catch (error: any) {
      console.error("Erro ao editar usuário:", error);
      api.error({
        message: "Erro ao Editar Usuário",
        description: error.message || "Verifique o console para mais detalhes.",
        placement: "topRight",
        duration: 5,
      });
    } finally {
      closeEditDialog();
    }
  };

  const handleConfirmDelete = async (userId: string) => {
    try {
      await deletarPessoa(userId);
      setPessoas((prev) => prev.filter((p) => p.id !== userId));
      api.success({
        message: "Sucesso",
        description: "Usuário excluído com sucesso!",
        placement: "topRight",
        duration: 3,
      });
    } catch (error: any) {
      console.error("Erro ao excluir usuário:", error);
      api.error({
        message: "Erro ao Excluir Usuário",
        description: error.message || "Verifique o console para mais detalhes.",
        placement: "topRight",
        duration: 5,
      });
    } finally {
      closeDeleteDialog();
    }
  };

  const integracaoPessoas = async () => {
    setIsLoading(true);
    try {
      const data = await importarPessoas();
      api.success({
        message: "Sucesso",
        description: "Integração realizada com sucesso!",
        placement: "topRight",
        duration: 3,
      });
      console.log(data);
      setIsLoading(false);
      getPessoas();
    } catch (error: any) {
      setIsLoading(false);
      api.error({
        message: "Erro ao chamar API",
        description: error.message || "Verifique o console para mais detalhes.",
        placement: "topRight",
        duration: 5,
      });
    }
  };

  return (
    <Box className={styles.container}>
      {contextHolder}
      <Flex className={styles.header}>
        <Box className={styles.syncButton}>
          <SyncOutlined
            spin={isLoading}
            onClick={integracaoPessoas}
            className={styles.spin}
          />
        </Box>

        <Box className={styles.filters}>
          <Filters onApplyFilters={handleApplyFilters} />
        </Box>

        <Box className={styles.addButton}>
          <Button className={styles.button} onClick={handleCreateUser}>
            <PlusOutlined /> Adicionar
          </Button>
        </Box>
      </Flex>

      <Box className={styles.mainContent}>
        {isLoaded ? (
          <div className={styles.tableContainer}>
            <table className={styles.userTable}>
              <thead>
                <tr>
                  <th>Avatar</th>
                  <th>Informações</th>
                  <th>Data de Cadastro</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {pessoas.map((item) => (
                  <tr key={item.id}>
                    <td data-label="Avatar">
                      <Box className={styles.avatar}>
                        <FaUser color="#0198DF" size={30} />
                      </Box>
                    </td>

                    <td data-label="Informações">
                      <Box className={styles.userInfo}>
                        <Box className={styles.userName}>{item.nome}</Box>
                        <Box className={styles.userEmail}>{item.email}</Box>
                        <Box className={styles.userPhone}>{item.telefone}</Box>
                        <Box className={styles.userAddress}>
                          Sem endereço informado
                        </Box>
                      </Box>
                    </td>

                    <td
                      data-label="Data de Cadastro"
                      className={styles.registrationDate}
                    >
                      {new Date(item.dataDeCadastro).toLocaleDateString(
                        "pt-BR"
                      )}
                    </td>

                    <td data-label="Ações">
                      <Flex className={styles.actionButtons}>
                        <EditOutlined
                          onClick={() => handleEdit(item)}
                          className={styles.iconEdit}
                          aria-label="Editar Usuário"
                        />
                        <UserDeleteOutlined
                          onClick={() => handleDelete(item)}
                          className={styles.iconDelete}
                          aria-label="Deletar Usuário"
                        />
                      </Flex>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Flex justify="center" align="center" height="200px">
            <span>Carregando...</span>
          </Flex>
        )}
      </Box>

      <EditUserDialog
        isOpen={isEditOpen}
        onClose={closeEditDialog}
        user={selectedUser}
        onSave={handleSaveEdit}
      />
      <DeleteUserDialog
        isOpen={isDeleteOpen}
        onClose={closeDeleteDialog}
        user={selectedUser}
        onConfirm={(userId: string) => handleConfirmDelete(userId)}
      />
      <CreateUserDialog
        isOpen={isCreateOpen}
        onClose={closeCreateDialog}
        onCreate={handleCreate}
      />
    </Box>
  );
};

export default UsersPage;
