import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Spin, notification, Select } from "antd";
import { obterPessoa } from "../services/pessoas";
import styles from "./styles.module.css";
import { Pessoa } from "../services/interface";

interface EditUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  user?: Pessoa;
  onSave: (updatedUser: Pessoa) => void;
}

const { Option } = Select;

const EditUserDialog: React.FC<EditUserDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  user,
}) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<Pessoa | undefined>(user);

  useEffect(() => {
    if (isOpen && user?.id) {
      const fetchUserDetails = async () => {
        setIsLoading(true);
        try {
          const details = await obterPessoa(user.id!);
          setInitialValues(details);
          form.setFieldsValue(details);
        } catch (error: any) {
          console.error("Erro ao buscar detalhes do usuário:", error);
          notification.error({
            message: "Erro",
            description: "Não foi possível buscar os detalhes do usuário.",
          });
        } finally {
          setIsLoading(false);
        }
      };

      fetchUserDetails();
    } else {
      setInitialValues(user);
      form.resetFields();
    }
  }, [isOpen, user, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const updatedUser: Pessoa = { ...initialValues, ...values };
        onSave(updatedUser);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    onClose();
    form.resetFields();
  };

  return (
    <Modal
      title="Editar Usuário"
      visible={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Salvar"
      cancelText="Cancelar"
      confirmLoading={isLoading}
      okButtonProps={{
        className: styles.buttonEdit,
      }}
    >
      {isLoading ? (
        <div style={{ textAlign: "center" }}>
          <Spin />
        </div>
      ) : (
        <Form
          form={form}
          layout="vertical"
          initialValues={initialValues}
          preserve={false}
        >
          <Form.Item
            label="Nome"
            name="nome"
            rules={[{ required: true, message: "Por favor, insira o nome!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Por favor, insira o email!" },
              { type: "email", message: "Por favor, insira um email válido!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Telefone"
            name="telefone"
            rules={[
              { required: true, message: "Por favor, insira o telefone!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Tipo"
            name="tipo"
            rules={[
              { required: true, message: "Por favor, selecione o tipo!" },
            ]}
          >
            <Select placeholder="Selecione o tipo">
              <Option value="Fornecedor">Fornecedor</Option>
              <Option value="Operador">Operador</Option>
              <Option value="Proprietário">Proprietário</Option>
              <Option value="Hóspede">Hóspede</Option>
            </Select>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default EditUserDialog;
