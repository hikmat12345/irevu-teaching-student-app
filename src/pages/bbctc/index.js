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
                        Beijing Blue Cube Technology Company
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
                    Beijing Blue Cube Technology Company
                  </h2>
                </Flip>
              </div>
              <div className="full">
                <Fade bottom duration={500}>
                  {t("privacy_policy") == "Privacy Policy" ? (
                    <p className="large">
                      <p>Beijing Blue Cube Technology Company is and I.T Development service provider specialising in web and mobile application development. Our developers have a combined experience of over 30 years working within technology, we offer cost effective and quality solutions that meet your development needs and budget.
                      </p>
                      <p>
                        Our services include development in areas such as:
                      </p>
                      <p>
                        <ul>
                          <li>Website development </li>
                          <li>E-Commerce web development - We chat and Ali Pay</li>
                          <li>Blogs</li>
                          <li>Web applications </li>
                          <li>Mobile phone applications; </li>
                          <li>Android, IOS and Hybrid applications  </li>
                        </ul>
                      </p>
                      <p>
                        If your looking for cost effective solutions for your business needs please contact us for enquiries.
                      </p>
                    </p>
                  ) : (
                    <p className="large">
                      <p>
                        北京蓝立方科技有限公司是一家专业从事网络和移动应用开发的IT开发服务提供商。我们的开发人员有超过30年的技术工作经验，提供高性价比和高质量的解决方案，以满足您的开发需求和预算。
                      </p>
                      <p>
                        我们的服务包括以下领域：
                      </p>
                      <p>
                        <ul>
                          <li>网站开发 </li>
                          <li>电子商务网站开发-微信和支付宝</li>
                          <li>博客</li>
                          <li>Web应用程序</li>
                          <li>手机应用程序 </li>
                          <li>Android, IOS和混合应用 </li>
                        </ul>
                      </p>
                      <p>
                        如果您正在为业务需求寻找具有成本效益的解决方案，请与我们联系。
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
