import React from 'react';
import PropTypes, { element } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';
import nl2br from 'react-newline-to-break';
import Button from '@material-ui/core/Button';
import TabSub from './TabSub';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 1000,
    height: 400,
  },
});

class FullWidthTabs extends React.Component {
  state = {
    value: 0,
    isCMND: false,
    isInfo: false,
    arrayText: null
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  renderLabel() {
    if (this.props.labelResult !== null)
      return (
        <div>
          {this.props.labelResult.labels.map(label =>
            (
              // <div class="label-flex">
              //   <div class="label-flex-sub"></div>
              //   <div class="label-flex-sub"></div>
              // </div>()

              <div>
                <div class="label-flex-progress">
                  <span >{label.description}</span>
                  <span>{Math.round(label.score * 100)}%</span>
                </div>
                <LinearProgress variant="determinate" value={Math.round(label.score * 100)} />
              </div>
            )
          )}
          {/* {JSON.stringify(this.props.labelResult.json)} */}
          <div class="label-span">JSON</div>
          <TextField
            multiline={true}
            rows={2}
            rowsMax={10}
            // disabled={true}
            // defaultValue={JSON.stringify(this.props.labelResult.json)}
            value={JSON.stringify(this.props.labelResult.json)}
            fullWidth={true}
          // label="JSON"
          />
        </div>
      )
  }
  renderLogo() {
    const logoResult = this.props.logoResult;
    if (logoResult !== null)
      return (
        <div>
          {logoResult.logos.map(logo =>
            (
              // <div class="label-flex">
              //   <div class="label-flex-sub"></div>
              //   <div class="label-flex-sub"></div>
              // </div>()
              <div>
                <div class="label-flex-progress">
                  <span >{logo.description}</span>
                  <span>{Math.round(logo.score * 100)}%</span>
                </div>
                <LinearProgress variant="determinate" value={Math.round(logo.score * 100)} />
              </div>
            )
          )}
          {/* {JSON.stringify(this.props.labelResult.json)} */}
          <h3 class="label-span">JSON</h3>
          <TextField
            multiline={true}
            rows={2}
            rowsMax={10}
            // disabled={true}
            // defaultValue={JSON.stringify(webResult.json)}
            value={JSON.stringify(logoResult.json)}
            fullWidth={true}
          // label="JSON"
          />
        </div>
      )
  }
  renderWeb() {
    const webResult = this.props.webResult;
    // const webResult = this.props.webResult;
    if (webResult !== null)
      return (
        <div>
          <h3 >Web entities</h3>
          {webResult.webEntities.map(webEntity =>
            (
              // <div class="label-flex">
              //   <div class="label-flex-sub"></div>
              //   <div class="label-flex-sub"></div>
              // </div>()
              <div>
                <div class="label-flex-progress">
                  <span >{webEntity.description}</span>
                  <span>{Math.round(webEntity.score * 100)}%</span>
                </div>
                <LinearProgress variant="determinate" value={Math.round(webEntity.score * 100)} />
              </div>
            )
          )}
          {/* {JSON.stringify(this.props.labelResult.json)} */}
          <h3 class="label-span">JSON</h3>
          <TextField
            multiline={true}
            rows={2}
            rowsMax={10}
            // disabled={true}
            // defaultValue={JSON.stringify(webResult.json)}
            value={JSON.stringify(webResult.json)}
            fullWidth={true}
          // label="JSON"
          />
        </div>
      )
  }
  checkCMND() {
    const webResult = this.props.webResult;
    const logoResult = this.props.logoResult;
    let isIdentityDocument = false;
    let isWebEntityCMND = false;
    let isVietnamGovernment = false;
    this.props.labelResult.labels.forEach(label => {
      if (label.description.toLowerCase().trim() === 'identity document')
        if (Math.round(label.score) >= 0.5)
          isIdentityDocument = true;

    })
    webResult.webEntities.forEach(webEntity => {
      if (webEntity.description.toLowerCase().trim() === 'chứng minh nhân dân')
        if (Math.round(webEntity.score) >= 0.5)
          isWebEntityCMND = true;

    })
    logoResult.logos.forEach(logo => {
      if (logo.description.toLowerCase().trim() === 'chứng minh nhân dân')
        if (Math.round(logo.score) >= 0.5)
        isVietnamGovernment = true;

    })
    this.setState({ isCMND: isIdentityDocument && isVietnamGovernment && isWebEntityCMND && this.props.numberFaces === 1 });
  }
  getInfo() {
    // let fullText = this.props.fullText;
    // let arrayText = fullText.split("\n");
    this.setState({ isInfo: true })
  }
  renderDocument(element, index) {
    if (element.length !== 0)
      return (
        <TextField
          id="outlined-name"
          label={"Dòng" + index}
          // className={classes.textField}
          value={element}
          // onChange={this.handleChange('name')}
          margin="normal"
          variant="outlined"
        />
      )
    return
  }
  renderInfo(element, index, arrayText) {
    if (element.length !== 0) {
      let value = element.toString();
      let name = "";
      if (index === 3) { // Lấy số cmnd
        name = " - Số CMND"
        if (value.indexOf(":") !== -1) {
          value = value.slice(value.indexOf(":"));
        } else {
          value = value.slice(2);
        }
      }
      if (index === 4) { // Lấy họ và tên
        name = " - Họ và tên"
        // if (value.indexOf(":") !== -1) {
        //   value = value.slice(value.indexOf(":")) + " "+ arrayText[5].split(".").join("");
        // }
        // else
        value = value.slice(7) + " " + arrayText[5].split(".").join("");
      }
      if (index === 6) { // Lấy ngày sinh
        name = " - Sinh ngày"
        // if (value.indexOf(":") !== -1) {
        //   value = value.slice(value.indexOf(":"));
        // }
        // else
        value = value.slice(10);
      }
      if (index === 7) { // Lấy Nguyên quán
        name = " - Nguyên quán"
        // if (value.indexOf(":") !== -1) {
        //   value = value.slice(value.indexOf(":"))+ " "+ arrayText[8].split(".").join("");
        // }
        // else
        value = value.slice(12) + " " + arrayText[8].split(".").join("");
      }
      if (index === 9) { // Lấy Nơi ĐKHK thường trú
        name = " - Nơi ĐKHK thường trú"
        // if (value.indexOf(":") !== -1) {
        //   value = value.slice(value.indexOf(":"))+ " "+ arrayText[10].split(".").join("");
        // }
        // else
        value = value.slice(20) + " " + arrayText[10].split(".").join("");
      }
      if (index !== 5 && index !== 8 && index !== 10) {
        return (
          <TextField
            id="outlined-name"
            label={"Dòng" + index + name}
            // className={classes.textField}
            value={value.split(".").join("")}
            // onChange={this.handleChange('name')}
            margin="normal"
            variant="outlined"
          />
        )
      }
    }
    return
  }
  componentWillMount() {
    this.checkCMND();
    const fullText = this.props.fullText;
    const arrayText = fullText.split("\n");
    this.setState({ arrayText })
  }
  render() {
    const { classes, theme } = this.props;
    return (
      <div class={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Document" />
            <Tab label="Face" />
            <Tab label="Label" />
            <Tab label="Logo" />
            <Tab label="Web" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <div>{
              this.state.isInfo ?
                <div>
                  <Button variant="outlined" color="primary" onClick={() => { this.setState({ isInfo: false }) }}>Quay lại</Button><br />
                  {
                    this.state.arrayText.map((element, index) =>
                      this.renderInfo(element, index, this.state.arrayText)
                    )}
                </div>
                :
                <div>
                  <div>
                    {

                      this.state.arrayText.map((element, index) =>
                        this.renderDocument(element, index)
                        //   <TextField
                        //   id="outlined-name"
                        //   label={"Dòng" + index}
                        //   // className={classes.textField}
                        //   value={element}
                        //   // onChange={this.handleChange('name')}
                        //   margin="normal"
                        //   variant="outlined"
                        // />
                      )
                    }
                  </div>
                  {
                    this.state.isCMND ?
                      <Button variant="outlined" color="primary" onClick={() => { this.getInfo() }} >Lấy thông tin</Button>
                      :
                      null
                  }
                  <div class="flex-container">
                    <div class="sub1">
                      <h3 class="label-span">Confidence</h3>
                      <div>
                        <TextField
                          multiline={true}
                          rows={2}
                          rowsMax={10}
                          // disabled={true}
                          value={this.props.document}
                          // defaultValue={this.props.document}
                          fullWidth={true}
                        />
                      </div>
                    </div>
                    <div class="sub1">
                      <h3 class="label-span">JSON</h3>
                      <div>
                        <TextField
                          multiline={true}
                          rows={2}
                          rowsMax={10}
                          // disabled={true}
                          value={JSON.stringify(this.props.docJson)}
                          // defaultValue={JSON.stringify(this.props.docJson)}
                          fullWidth={true}
                        />
                      </div>
                    </div>
                  </div>
                </div>
            }
            </div>
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <div >Số khuôn mặt: {this.props.numberFaces}</div>
            <br />
            {this.props.cropFiles.map(img => (
              <img src={img} alt="Ảnh crop" height="250" width="250" />
            )
            )
            }
            <div class="sub1">
              <h3 class="label-span">JSON</h3>
              <div>
                <TextField
                  multiline={true}
                  rows={2}
                  rowsMax={10}
                  // disabled={true}
                  value={JSON.stringify(this.props.faceJson)}
                  // defaultValue={JSON.stringify(this.props.docJson)}
                  fullWidth={true}
                />
              </div>
            </div>
          </TabContainer>
          <TabContainer dir={theme.direction}>
            {
              this.renderLabel()
            }
          </TabContainer>
          <TabContainer dir={theme.direction}>
            {
              this.renderLogo()
            }
          </TabContainer>
          <TabContainer dir={theme.direction}>
            {
              this.renderWeb()
            }
          </TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);
