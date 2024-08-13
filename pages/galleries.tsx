import { useState } from 'react';
import { Card, Button, Modal, Form, Input, Upload, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { uploadFileToS3 } from '@/utils/uploadFileToS3';

const Galleries = () => {
    const [visible, setVisible] = useState(false);
    const [galleries, setGalleries] = useState<{ name: string; images: string[] }[]>([]);
    const [fileList, setFileList] = useState<any[]>([]);

    const handleUpload = async () => {
        try {
            const uploadedUrls = await Promise.all(fileList.map(file => uploadFileToS3(file)));
            return uploadedUrls;
        } catch (error: any) {
            notification.error({ message: 'Error uploading files', description: error.message });
            return [];
        }
    };

    const handleCreateGallery = async (values: { name: string }) => {
        const imageUrls = await handleUpload();
        if (imageUrls.length) {
            setGalleries([...galleries, { name: values.name, images: imageUrls }]);
            setFileList([]);
            setVisible(false);
            notification.success({ message: 'Gallery created successfully!' });
        } else {
            notification.error({ message: 'Failed to create gallery' });
        }
    };

    const uploadProps = {
        onRemove: (file: any) => {
            setFileList(prevList => prevList.filter(item => item.uid !== file.uid));
        },
        beforeUpload: (file: any) => {
            setFileList(prevList => [...prevList, file]);
            return false; // Prevents upload as we are managing it manually
        },
        fileList,
    };

    return (
        <div>
            <Button type="primary" onClick={() => setVisible(true)}>
                Create Gallery
            </Button>
            <div style={{ marginTop: 20 }}>
                {galleries.map((gallery, index) => (
                    <Card key={index} title={gallery.name} style={{ marginBottom: 20 }}>
                        {gallery.images.map((image, idx) => (
                            <img key={idx} src={image} alt={`Gallery Image ${idx + 1}`} style={{ maxWidth: '100%', marginBottom: 10 }} />
                        ))}
                    </Card>
                ))}
            </div>
            <Modal
                title="Create Gallery"
                visible={visible}
                onCancel={() => setVisible(false)}
                footer={null}
            >
                <Form onFinish={handleCreateGallery}>
                    <Form.Item name="name" label="Gallery Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Upload Images">
                        <Upload {...uploadProps} listType="picture-card">
                            {fileList.length >= 8 ? null : (
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Create
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Galleries;
