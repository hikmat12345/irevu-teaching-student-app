import React, { useState } from "react";
import "../../assets/css/bootstrap.css";
import "../../assets/css/style.css";
import logo1 from "../../assets/images/logo/favicon.png";
import logo_chi from "../../assets/images/logo/logo_chi.png";
import logoBlue from "../../assets/logo/logo_blue.png";
import university from "../../assets/images/university.jpg";
import student from "../../assets/images/student.jpg";
import teacher from "../../assets/images/teacher.jpg";
import testimonal from "../../assets/css/images/testimon.png";
import { Fade, Flip, Zoom } from "react-reveal";
import fivePerson from "../../assets/images/slider-images/5person.jpg";
import { useTranslation } from "react-i18next";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {
  Container,
  Button,
  TextField,
  Box,
  Grid,
  Card,
  Typography,
  Input,
  Menu,
  MenuItem
} from "@material-ui/core";
import { max } from "underscore";

const MainPage2 = () => {
  const { t, i18n } = useTranslation();
  const [menuForMob, setMenuForMob] = useState(false);
  const [openLangOptions, setOpenLangOptions] = useState(true);
  const [menuForSmall, setMenuForSmall] = useState(false);

  const handleClick = lng => {
    // setAnchorEl(event.currentTarget);
    openLangsOptions();
    i18n.changeLanguage(lng);
  };

  const handleClose = () => {
    // setAnchorEl(null);
  };
  const toggleMenuForMob = () => {
    setMenuForMob(!menuForMob);
  };
  const toggleThis = () => {
    setMenuForSmall(!menuForSmall);
  };
  const openLangsOptions = () => {
    setOpenLangOptions(!openLangOptions);
  };

  // const state = this.state;
  // const { t } = this.props;
  return (
    <body id="home_page" className="home_page">
      {/* <!-- header --> */}
      <header className="header">
        <div className="header_top_section">
          <div className="header-container">
            <div className="row">
              <div className="col-lg-2">
                <div className="full">
                  <div className="logo">
                    <a href="login">
                      <img src={t('login')=='LOGIN' ? logo1:logo_chi} alt="#" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-10 site_information">
                <div className="full">
                  <div className="main_menu">
                    <nav className="navbar navbar-inverse navbar-toggleable-md">
                      <button
                        className="navbar-toggler"
                        type="button"
                        onClick={() => toggleThis()}
                      >
                        <i className="fa fa-bars"></i>
                        <i className="fa fa-close"></i>
                      </button>

                      <div
                        className=" navbar-collapse justify-content-md-center"
                        id="cloapediamenu"
                        style={{
                          display: menuForSmall ? "block" : "none"
                        }}
                      >
                        <ul className="navbar-nav">
                          <li className="nav-item active">
                              <a className="nav-link" href="bbctc">
                                {t('bbct')}
                              </a>
                            </li>
                          <li className="nav-item active">
                            <a className="nav-link color-aqua-hover" href="/">
                              {t('home')}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link color-aqua-hover"
                              href="english-tutorial"
                            >
                              {t('english_tutoring')}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link color-grey-hover"
                               href="about-us"
                            >
                              {t('about')}
                            </a>
                          </li>
                          <li className="nav-item">
                              <a
                                className="nav-link color-grey-hover"
                                href="privacy-policy"
                              >
                               { t("privacy_policy").toUpperCase() }
                              </a>
                            </li>
                          <li className="nav-item">
                            <a
                              className="nav-link color-grey-hover"
                              href="register"
                            >
                              {t('register')}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link color-grey-hover"
                              href="login"
                            >
                              {t('login')}
                            </a>
                          </li>
                          <li>
                            <div style={{ width: '90px', margin: '0 auto' }}>
                              <Button
                                aria-controls="simple-menu"
                                aria-haspopup="true"
                                // className={styles.fontRegular}
                                style={{
                                  color: '#fff',
                                  borderRadius: '5px',
                                  border: '1px solid #fff',
                                }}
                                onClick={openLangsOptions}
                              >
                                {t('language')}
                              </Button>

                              {!openLangOptions ? (
                                <div className="dropdownDiv">
                                  <ul>
                                    <li>
                                      <a
                                        style={{
                                          display: 'flex',
                                          justifyContent: 'space-between',
                                        }}
                                        href="#"
                                        onClick={() => handleClick('chi')}
                                      >
                                        Chinese
                                        {t('language') != 'LANGUAGE' && (
                                          <CheckCircleIcon
                                            name="CheckCircle"
                                            size={15}
                                            color="primary"
                                          />
                                        )}
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        style={{
                                          display: 'flex',
                                          justifyContent: 'space-between',
                                        }}
                                        href="#"
                                        onClick={() => handleClick('en')}
                                      >
                                        English
                                        {t('language') == 'LANGUAGE' && (
                                          <CheckCircleIcon
                                            name="CheckCircle"
                                            size={15}
                                            color="primary"
                                          />
                                        )}
                                      </a>
                                      
                                    </li>
                                  </ul>
                                </div>
                              ) : (
                                ''
                              )}
                            </div>
                          </li>
                        </ul>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* <!-- end header --> */}

      {/* <!-- section --> */}
      <section className="main_full banner_section_top">
        <div className="container-fluid">
          <div className="row">
            <div className="full">
              <div className="slider_banner">
                <img className="img-responsive" src={fivePerson} alt="#" />
                <div className="slide_cont">
                  <div className="slider_cont_inner">
                    <Fade top duration={2000}>
                      <h3>
                        {t("about_us")}
                      </h3>
                    </Fade>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- end section --> */}

      {/* <!-- about section --> */}
      <section className="layout_padding section about_dottat">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text_align_center">
              <div className="full heading_s1">
                <Flip top duration={2000}>
                  <h2>
                    {t("about_us")}
                  </h2>
                </Flip>
              </div>
              <div className="full">
                <Fade bottom duration={500}>
                  {t("privacy_policy") == "Privacy Policy" ? (
                    <p className="large">
                      <p>i- Revu/Perfect Homework is committed to enhancing the working and learning lives of teachers and students. As teachers we understand the daily challenges and pain points that those involved in academic life face.
                      </p>
                      <p>
                        In order to improve the productivity of teachers with ever increasing workloads, deadlines and research requirements time has become even more valuable, so we are delivering a solution that can help save them precious time. Thereby, freeing them up to concentrate on the things which are important to them.
                      </p>
                      <p>
                        Today students campus life is busy with a lot of challenges, as standards in education increase and competition becomes stronger. We are hoping to allow them the opportunity to interact with each other and with academic staff in order to promote knowledge transfer which will help them improve their educational performance and learning experience. 
                      </p>
                      
                    </p>
                  ) : (
                    <p className="large">
                      <p>
                        完美功课致力于提升教师和学生的工作和学习生活。作为教师，我们非常理解每天参与学术生活的人面临的挑战和痛点。
                      </p>
                      <p>
                        在工作量不断增加的情况下，为了提高教师的工作效率，规定期限和研究需求时间变得更加宝贵，因此我们提供了一个解决方案，可以帮助他们节省宝贵的时间。这样，他们就能把精力集中在对他们重要的事情上。
                      </p>
                      <p>
                        如今，随着教育标准的提高和竞争的不断加剧，学生的校园生活充满了挑战。我们希望让他们有机会相互交流，并与学术人员交流，以促进知识转移，帮助他们改善教育表现和学习体验。
                      </p>
                      
                    </p>
                  )}
                </Fade>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- end section --> */}

      {/* <!-- footer --> */}
      <footer className="footer layout_padding" duration={2000}>
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-sm-12">
              <a href="index.html">
                <img className="img-responsive" src={logoBlue} alt="#" />
              </a>
              <div className="footer_menu margin_top_30">
                <ul>
                  <li><a href="/bbctc">{t('bbct_ltd')}</a></li>
                </ul>
              </div>
            </div>

            <div className="col-md-8">
              <div className="row">
                <div className="col-md-6 col-sm-12">
                  <div className="footer_link_heading">
                    <h3>{t('table_of_content')}</h3>
                  </div>
                  <div className="footer_menu">
                    <ul>
                      <li>
                        <a href="/">{t('home')}</a>
                      </li>
                      <li>
                        <a href="/about-us">{t('about')}</a>
                      </li>
                      <li>
                        <a href="/english-tutorial">{t('english_tutoring')}</a>
                      </li>
                      <li>
                        <a href="/contact">{t('contact_us')}</a>
                      </li>
                      <li>
                        <a href="/privacy-policy">{t('agreement_terms')}</a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-md-6 col-sm-12">
                  <div className="footer_link_heading">
                    <h3>{t('contact_us')}</h3>
                  </div>
                  <div className="footer_menu">
                    <ul>
                      <li><a href="mailto:enquiries@irevu.org">enquiries@irevu.org</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="cpy">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <p>Copyright @ 2019, i-revu. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- end footer --> */}
    </body>
  );
};
export default MainPage2;
