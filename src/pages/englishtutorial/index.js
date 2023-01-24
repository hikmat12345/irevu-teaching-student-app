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
                        {t("english_tutoring")}
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
                    {t("Academic English Support+")}
                  </h2>
                </Flip>
              </div>
              <div className="full">
                <Fade bottom duration={500}>
                  {t("academic_english_support") == "Academic English Support" ? (
                    <p className="large">
                      <p>The need for high calibre graduates with excellent English skills in China has never been greater. Employers in China are increasingly seeking graduates with a high level of English proficiency. Graduates with good English skills have a better chance of being selected and have better promotional prospects. Stay ahead of the curve by ensuring your  writing skills and academic papers are professionally reviewed to enhance quality whilst improving your ability.
                      </p>
                      <p>
                        China is the number 1 country in sending students overseas for further academic study in tier 1 universities globally. To ensure your application receives the best possible response have your Personal Statements supported with assistance from professional writers who have an in-depth knowledge of the application process. If you need comprehensive overseas university application assistance please contact us.
                      </p>
                      <p>
                        Support for:  
                      </p>
                      <p>
                        <ul>
                          <li>IELTS, TOEFEL, CET, TEM</li>
                          <li>PROOF READING OF ACADEMIC PAPERS</li>
                          <li>ASSISTANCE  WITH  PERSONAL  STATEMENTS FOR UNIVERSITY APPLICATIONS</li>
                        </ul>
                      </p>
                    </p>
                  ) : (
                    <p className="large">
                      <p>
                        在中国，对具有优秀英语技能的高素质毕业生的需求越来越大。中国的公司单位对英语水平高的毕业生需求也随之增高。英语水平好的毕业生更有机会被录用，也有更好的晋升机会。保持领先的曲线，确保写作技能和学术论文的专业审查，以提高学术质量，同时提高你各方面a的能力。
                      </p>
                      <p>
                        中国学生出国留学的数量占据全球第一。为了确保你能够申请到更满意的学校，个人陈述需要对申请过程有深入了解的专业人员帮助。如果您需要全面的海外大学申请帮助，请随时联系我们。
                      </p>
                      <p>
                        支持：
                      </p>
                      <p>
                        <ul>
                          <li>雅思、托福、CET、TEM</li>
                          <li>学术论文的校对</li>
                          <li>协助大学申请的个人陈述</li>
                        </ul>
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
