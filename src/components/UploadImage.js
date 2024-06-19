import axios from "axios";
import { useState } from "react";

function UploadImage() {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        const formData = new FormData()
        formData.append('image', file)
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/upload_image', formData, {
                headers: {
                    'content-Type': 'form-data/multipart',
                    'accept': 'image/*',
                    
                }
            })
            console.log('uploaded:',response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
            <div className="mb-3">
                <label htmlFor="image" className="form-label">
                    Choose file
                </label>
                <input
                    type="file"
                    className="form-control"
                    name="image"
                    id="image"
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </div>
            <button type="button" className="btn btn-primary" onClick={handleUpload}>
                Upload
            </button>
        </div>
    );
}

export default UploadImage;
