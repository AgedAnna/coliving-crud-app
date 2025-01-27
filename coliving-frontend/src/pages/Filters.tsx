import { Form, Input, Select, DatePicker, Row, Col } from "antd";

const { Option } = Select;
const { RangePicker } = DatePicker;

interface FiltersProps {
  onApplyFilters: (filters: {
    nome?: string;
    email?: string;
    tipo?: string;
    dataDeCadastro?: [string, string];
  }) => void;
}

const Filters: React.FC<FiltersProps> = ({ onApplyFilters }) => {
  const [form] = Form.useForm();

  const handleValuesChange = (_changedValues: any, allValues: any) => {
    const formattedFilters = {
      ...allValues,
      dataDeCadastro: allValues.dataDeCadastro
        ? [
            allValues.dataDeCadastro[0].startOf("day").toISOString(),
            allValues.dataDeCadastro[1].endOf("day").toISOString(),
          ]
        : undefined,
    };
    onApplyFilters(formattedFilters);
  };

  return (
    <Form form={form} layout="vertical" onValuesChange={handleValuesChange}>
      <Row gutter={16}>
        <Col span={6}>
          <Form.Item label="Nome" name="nome">
            <Input placeholder="Digite o nome" />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item label="Email" name="email">
            <Input placeholder="Digite o email" />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item label="Tipo" name="tipo">
            <Select placeholder="Selecione o tipo" allowClear>
              <Option value="Fornecedor">Fornecedor</Option>
              <Option value="Operador">Operador</Option>
              <Option value="Proprietário">Proprietário</Option>
              <Option value="Hóspede">Hóspede</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item label="Cadastro" name="dataDeCadastro">
            <RangePicker />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default Filters;
