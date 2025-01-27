import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, Spin } from "antd";
import styles from "./styles.module.css";

interface Pessoa {
  id?: string;
  nome: string;
  telefone: string;
  email: string;
  tipo: string;
  dataDeCadastro: string;
}

interface CreateUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (newUser: Omit<Pessoa, "id" | "dataDeCadastro">) => Promise<void>;
}

const { Option } = Select;

const CreateUserDialog: React.FC<CreateUserDialogProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      form.resetFields();
    }
  }, [isOpen, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setIsSubmitting(true);
      await onCreate(values);
      form.resetFields();
    } catch (error) {
      console.error("Falha na validação do formulário:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    onClose();
    form.resetFields();
  };

  return (
    <Modal
      title="Adicionar Novo Usuário"
      visible={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Adicionar"
      cancelText="Cancelar"
      confirmLoading={isSubmitting}
      okButtonProps={{
        className: styles.button,
      }}
    >
      {isSubmitting ? (
        <div style={{ textAlign: "center" }}>
          <Spin />
        </div>
      ) : (
        <Form form={form} layout="vertical" name="create_user_form">
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

export default CreateUserDialog;
