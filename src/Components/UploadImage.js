import React, { Component } from 'react';
import axios from 'axios';
import nl2br from 'react-newline-to-break';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import TabContainer from './TabContainer';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});
class UploadImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            isPending: false,
            isUpload: false,
            isProcess: false,
            imagePath: null,
            text: null,
            numFaces: 0,
            isClickFace: false,
            isClickDocument: true,
            cropFiles: null,
            labelResult: null,
            webResult: null,
            fullText: null,
            docJson: null,
            faceJson: null,
            logoResult: null,
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onFormSubmit(e) {
        if (this.state.file === null) {
            alert("Vui lòng chọn file");
            return;
        }
        this.setState({ isPending: true, isProcess: true, isUpload: false });
        e.preventDefault();
        const formData = new FormData();
        formData.append('myImage', this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        //https://mhaik36server2.herokuapp.com/upload
        axios.post("https://i2i-appserver.herokuapp.com/upload", formData, config)  //http://localhost:4000/upload
            .then((response) => {
                this.setState({
                    isUpload: true,
                    isPending: false,
                    imagePath: response.data.filename,
                    text: response.data.textDetection.content,
                    numFaces: response.data.Detectface.numFaces,
                    cropFiles: response.data.Detectface.cropFiles,
                    labelResult: response.data.labelResult,
                    webResult: response.data.webResult,
                    fullText: response.data.textDetection.fullText,
                    docJson: response.data.textDetection.json,
                    faceJson: response.data.Detectface.json,
                    logoResult: response.data.logoResult,
                });
                console.log('json:' + JSON.stringify(response.data.logoResult))
                // alert("The file is successfully uploaded");
            }).catch((error) => {
            });
    }
    onChange(e) {
        this.setState({
            file: e.target.files[0],
            isPending: false,
            isUpload: false,
            isProcess: false
        });
    }
    renderResult() {
        if (this.state.isUpload)
            return (
                <div>
                    <TabContainer docJson={this.state.docJson} fullText={this.state.fullText} document={this.state.text} numberFaces={this.state.numFaces}
                        faceJson={this.state.faceJson} cropFiles={this.state.cropFiles} labelResult={this.state.labelResult}
                        webResult={this.state.webResult} logoResult={this.state.logoResult} />
                </div>

            )
        else
            return (
                <div class="spinner">
                    <CircularProgress />
                    <span style={{ marginLeft: '5px' }} >Đang xử lý...</span>
                </div>
            )
    }
    render() {
        const { classes } = this.props;
        return (
            <div class="upload-container">
                <form onSubmit={this.onFormSubmit}>
                    <h1>Detecting text in a image</h1>
                    <Input type="file" variant="outlined"  name="myImage" onChange={this.onChange} />
                    <Button type="submit" variant="outlined" color="primary" className={classes.button}>Upload</Button>
                </form>
                <div class="flex-container">
                    <div class="sub1">
                        <h3> Ảnh </h3>
                        {
                            this.state.isPending ?
                                <div class="spinner">
                                    <CircularProgress />
                                    <span style={{ marginLeft: '5px' }} >Đang đợi lấy ảnh...</span>
                                </div>
                                :
                                null
                        }
                        {
                            this.state.isUpload ?
                                <div>
                                    <img src={'https://i2i-appserver.herokuapp.com/uploads/'+this.state.imagePath} alt="Ảnh" height="250" width="250" />
                                </div>
                                :
                                null
                        }

                    </div>
                    <div style={{ flex: 1 }}>
                        <h3> Kết quả </h3>
                        {
                            this.state.isProcess ?
                                this.renderResult()
                                :
                                null
                        }
                    </div>
                </div>
            </div>
        )
    }
}

UploadImage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UploadImage);