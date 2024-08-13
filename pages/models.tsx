import { useState } from 'react';
import { Card, Button, Modal, Form, Input } from 'antd';

const Models = () => {
    const [visible, setVisible] = useState(false);
    const [models, setModels] = useState<{ name: string; description: string; url: string }[]>([]);

    const handleCreateModel = (values: { name: string; description: string; url: string }) => {
        setModels([...models, values]);
        setVisible(false);
    };

    return (
        <div>
            <Button type="primary" onClick={() => setVisible(true)}>
                Add Model
            </Button>
            <div style={{ marginTop: 20 }}>
                {models.map((model, index) => (
                    <Card key={index} title={model.name} style={{ marginBottom: 20 }}>
                        <p>{model.description}</p>
                        <p>{model.url}</p>
                    </Card>
                ))}
            </div>
            <Modal
                title="Add Model"
                visible={visible}
                onCancel={() => setVisible(false)}
                footer={null}
            >
                <Form onFinish={handleCreateModel}>
                    <Form.Item name="name" label="Model Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="url" label="URL" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Add
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Models;
