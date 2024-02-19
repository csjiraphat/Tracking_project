import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const AboutMe = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.container}>
      <Typography variant="h4" gutterBottom>
        About Me
      </Typography>
      <Typography variant="body1" paragraph>
        ยินดีต้อนรับ
      </Typography>
      <Typography variant="body1" paragraph>
        ผมชื่อ จิรพัฒน์ กุสาวดี เป็นนักศึกษาของมหาวิทยาลัยราชภัฏเชียงราย ปี 3
        กระผมจัดทำเว็บไซท์นี้ขึ้นมาเพื่อประกอบการเรียน
        ไม่มีเจตนาขโมยลิขสิทธิ์ของใคร
      </Typography>
      <Typography variant="body2" paragraph>
        Welcome
      </Typography>
      <Typography variant="body2" paragraph>
        My name is Jiraphat Kusawadee I am a third year student of Chiang Rai
        Rajabhat University. I created this website for study purposes. There is
        no intention of stealing anyone's copyright.
      </Typography>
      {/* Add more content about yourself */}
    </Container>
  );
};

export default AboutMe;
