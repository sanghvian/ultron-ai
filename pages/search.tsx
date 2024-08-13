import { useState } from 'react';
import { Button, Upload, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const SearchPage = () => {
    const [fileList, setFileList] = useState<any[]>([]);

    const handleUpload = () => {
        if (fileList.length === 0) {
            notification.error({ message: 'Please upload an image first.' });
            return;
        }

        // Here you would add the logic to search the image embeddings
        notification.success({ message: 'Image uploaded successfully!' });
        setFileList([]);
    };

    const props = {
        onRemove: (file: any) => {
            setFileList((prevList) => prevList.filter((item) => item.uid !== file.uid));
        },
        beforeUpload: (file: any) => {
            setFileList((prevList) => [...prevList, file]);
            return false;
        },
        fileList,
    };

    return (
        <div>
            <Upload {...props}>
                <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
            <Button
                type="primary"
                onClick={handleUpload}
                style={{ marginTop: 20 }}
            >
                Search
            </Button>
        </div>
    );
};

export default SearchPage;
