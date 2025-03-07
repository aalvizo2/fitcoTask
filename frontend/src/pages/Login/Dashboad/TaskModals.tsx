import React, { useEffect, useState } from "react";
import {
    Form,
    Input,
    Checkbox,
    Modal,

} from 'antd';

import { SaveOutlined } from '@ant-design/icons';
import { editTask } from "../../../domain/entities/Task";


interface TaskProps {
    onSubmit: (values: any) => void;
    open: boolean;
    onCancel: () => void;

}


export const AddModal: React.FC<TaskProps> = ({ onSubmit, open, onCancel }) => {
    const [form] = Form.useForm();
    const [estatus, setEstatus] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEstatus(e.target.checked); // Si está seleccionado, será true; sino, será false
    };

    const handleSubmit = () => {
        form.validateFields().then(values => {
            onSubmit({
                ...values
            });
            onCancel();
        })
    };

    return (
        <Modal
            open={open}
            onCancel={onCancel}
            onOk={handleSubmit}
            okButtonProps={{
                icon: <SaveOutlined />,
                type: "primary", // Cambiado a "primary" para un estilo más limpio
                style: { backgroundColor: '#1890ff', borderColor: '#1890ff', width: 150 }, // Estilo personalizado
            }}
            cancelButtonProps={{
                type: "default",
                style: {
                    width: 150,
                }
            }}
            okText="Guardar"
            cancelText="Cancelar"
            title="Agregar tarea"
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Titulo"
                    name="titulo"
                    rules={[{
                        required: true,
                        message: 'Ingresa un titulo'
                    }]}

                >
                    <Input placeholder="Ingresa un titulo" />
                </Form.Item>
                <Form.Item
                    label="Descripción"
                    name="descripcion"
                    rules={[{
                        required: true,
                        message: 'Ingresa una descripción valida'
                    }]}

                >
                    <Input placeholder="Ingresa una descripción" />

                </Form.Item>
                <Form.Item
                    label="Estatus"
                    name="estatus"
                    valuePropName="checked"
                >

                    <Checkbox
                        checked={estatus}
                        //@ts-expect-error
                        onChange={handleChange}
                    />

                </Form.Item>
            </Form>
        </Modal>
    )

};


interface EditTaskProps {
    onCancel: () => void;
    onSubmit: (data: editTask) => void;
    open: boolean,
    datoFila: { [key: string]: any } | null;
}

export const EditModal: React.FC<EditTaskProps> = ({ open, onCancel, onSubmit, datoFila }) => {
    const [form] = Form.useForm();
    const [estatus, setEstatus] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEstatus(e.target.checked); // Si está seleccionado, será true; sino, será false
    };

    useEffect(() => {
        if (datoFila) {
            form.setFieldsValue(datoFila);
        }
    }, [datoFila])

    const handleSubmit = () => {
        form.validateFields().then(values => {
            onSubmit({
                ...values,
                ...datoFila
            });
            onCancel();
        });
    };

    return (
        <Modal
            open={open}
            onCancel={onCancel}
            onOk={handleSubmit}
            okButtonProps={{
                icon: <SaveOutlined />,
                type: "primary", // Cambiado a "primary" para un estilo más limpio
                style: { backgroundColor: '#1890ff', borderColor: '#1890ff', width: 150 }, // Estilo personalizado
            }}
            cancelButtonProps={{
                type: "default",
                style: {
                    width: 150,
                }
            }}
            okText="Guardar"
            cancelText="Cancelar"
            title="Editar tarea"
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Titulo"
                    name="titulo"
                    rules={[{
                        required: true,
                        message: 'Ingresa un titulo'
                    }]}
                >
                    <Input placeholder="Ingresa un titulo" />
                </Form.Item>
                <Form.Item
                    label="Descripción"
                    name="descripcion"
                    rules={[{
                        required: true,
                        message: 'Ingresa una descripción válida'
                    }]}
                >
                    <Input placeholder="Ingresa una descripción" />
                </Form.Item>
                <Form.Item
                    label="Estatus"
                    name="estatus"
                    valuePropName="checked"
                >
                    <Checkbox
                        checked={estatus}
                        //@ts-expect-error
                        onChange={handleChange}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};
