import { useState } from 'react';
import { Card, Button, Modal, Form, Input, Select, Spin, notification } from 'antd';

const { Option } = Select;

const FeatureSets = () => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [featureSets, setFeatureSets] = useState<{ name: string; imageSetUUID: string; modelUUID: string }[]>([]);

    const handleCreateFeatureSet = (values: { name: string; imageSetUUID: string; modelUUID: string }) => {
        setLoading(true);

        setTimeout(() => {
            setFeatureSets([...featureSets, values]);
            setLoading(false);
            setVisible(false);
            notification.success({ message: 'Feature set created successfully!' });
        }, 5000);
    };

    return (
        <div>
            <Button type="primary" onClick={() => setVisible(true)}>
                Create Feature Set
            </Button>
            <div style={{ marginTop: 20 }}>
                {featureSets.map((featureSet, index) => (
                    <Card key={index} title={featureSet.name} style={{ marginBottom: 20 }}>
                        <p>Image Set UUID: {featureSet.imageSetUUID}</p>
                        <p>Model UUID: {featureSet.modelUUID}</p>
                    </Card>
                ))}
            </div>
            <Modal
                title="Create Feature Set"
                visible={visible}
                onCancel={() => setVisible(false)}
                footer={null}
            >
                <Form onFinish={handleCreateFeatureSet}>
                    <Form.Item name="name" label="Feature Set Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="imageSetUUID" label="Image Set UUID" rules={[{ required: true }]}>
                        <Select placeholder="Select Image Set">
                            {/* Replace with actual Image Set UUIDs */}
                            <Option value="uuid1">Image Set 1</Option>
                            <Option value="uuid2">Image Set 2</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="modelUUID" label="Model UUID" rules={[{ required: true }]}>
                        <Select placeholder="Select Model">
                            {/* Replace with actual Model UUIDs */}
                            <Option value="model1">Model 1</Option>
                            <Option value="model2">Model 2</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" disabled={loading}>
                            {loading ? <Spin /> : 'Create'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default FeatureSets;
