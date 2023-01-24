import React, {useState} from "react";
import "../../assets/css/bootstrap.css";
import "../../assets/css/style.css";
import logo1 from "../../assets/images/logo/favicon.png";
import logo_chi from "../../assets/images/logo/logo_chi.png";
import logoBlue from "../../assets/logo/logo_blue.png";
import university from "../../assets/images/university.jpg";
import student from "../../assets/images/student.jpg";
import teacher from "../../assets/images/teacher.jpg";
import testimonal from "../../assets/css/images/testimon.png";
import {Fade, Flip, Zoom} from "react-reveal";
import fivePerson from "../../assets/images/slider-images/5person.jpg";
import {useTranslation} from "react-i18next";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
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
  MenuItem,
} from "@material-ui/core";
import {max} from "underscore";

const PrivacyPolicy = () => {
  const {t, i18n} = useTranslation();
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
                      <img
                        src={t("login") == "LOGIN" ? logo1 : logo_chi}
                        alt="#"
                      />
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
                          display: menuForSmall ? "block" : "none",
                        }}
                      >
                        <ul className="navbar-nav">
                          <li className="nav-item active">
                            <a className="nav-link" href="bbctc">
                              {t("bbct")}
                            </a>
                          </li>
                          <li className="nav-item active">
                            <a className="nav-link color-aqua-hover" href="/">
                              {t("home")}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link color-aqua-hover"
                              href="english-tutorial"
                            >
                              {t("english_tutoring")}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link color-grey-hover"
                              href="about-us"
                            >
                              {t("about")}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link color-grey-hover"
                              href="privacy-policy"
                            >
                              {t("privacy_policy").toUpperCase()}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link color-grey-hover"
                              href="register"
                            >
                              {t("register")}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link color-grey-hover"
                              href="login"
                            >
                              {t("login")}
                            </a>
                          </li>
                          <li>
                            <div style={{width: "90px", margin: "0 auto"}}>
                              <Button
                                aria-controls="simple-menu"
                                aria-haspopup="true"
                                // className={styles.fontRegular}
                                style={{
                                  color: "#fff",
                                  borderRadius: "5px",
                                  border: "1px solid #fff",
                                }}
                                onClick={openLangsOptions}
                              >
                                {t("language")}
                              </Button>

                              {!openLangOptions ? (
                                <div className="dropdownDiv">
                                  <ul>
                                    <li>
                                      <a
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                        }}
                                        href="#"
                                        onClick={() => handleClick("chi")}
                                      >
                                        Chinese
                                        {t("language") != "LANGUAGE" && (
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
                                          display: "flex",
                                          justifyContent: "space-between",
                                        }}
                                        href="#"
                                        onClick={() => handleClick("en")}
                                      >
                                        English
                                        {t("language") == "LANGUAGE" && (
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
                                ""
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
                        {t("Terms_conditions")} <br />
                        <span className="text-my-blue">
                          {t("privacy_policy")}
                        </span>
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
                    {t("Terms_conditions")} <br /> {t("privacy_policy")}
                  </h2>
                </Flip>
              </div>
              <div className="full">
                {/* <Flip bottom duration={500}> */}
                  {t("privacy_policy") &&
                  t("privacy_policy") == "And Privacy Policy" ? (
                    <p className="large">
                      <>
                        <p>
                          <strong>1. Introduction</strong>
                        </p>
                        <p>
                          These Website/APP&nbsp;Standard Terms And Conditions
                          (these “Terms” or these “Website Standard Terms And
                          Conditions”) contained herein on this web-page, shall
                          govern your use of this website,&nbsp;and APP
                          including all pages within this website (collectively
                          referred to herein below as this “Website”). These
                          Terms apply in full force and effect to your use of
                          this Website and by using this Website, you expressly
                          accept all terms and conditions contained herein in
                          full. You must not use this Website, if you have any
                          objection to any of these Website Standard Terms And
                          Conditions.
                        </p>
                        <p>
                          <br />
                        </p>
                        <p>
                          <strong>2. Intellectual Property Rights</strong>
                        </p>
                        <p>
                          Other than content you own, which you may have opted
                          to include on this Website, under these Terms, Beijing
                          Blue Cube Technology Company Ltd. and/or its licensors
                          own all rights to the intellectual property and
                          material contained in this Website?APP, and all such
                          rights are reserved. You are granted a limited license
                          only, subject to the restrictions provided in these
                          Terms, for purposes of viewing the material contained
                          on this Website/APP.
                        </p>
                        <p>
                          <strong>3. Restrictions</strong>
                        </p>
                        <p>
                          You are expressly and emphatically restricted from all
                          of the following:
                        </p>
                        <p>publishing any Website material in any media;</p>
                        <p>
                          selling, sublicensing and/or otherwise commercializing
                          any Website material;
                        </p>
                        <p>
                          publicly performing and/or showing any Website
                          material;
                        </p>
                        <p>
                          using this Website in any way that is, or may be,
                          damaging to this Website;
                        </p>
                        <p>
                          using this Website in any way that impacts user access
                          to this Website;
                        </p>
                        <p>
                          using this Website contrary to applicable laws and
                          regulations, or in a way that causes, or may cause,
                          harm to the Website, or to any person or business
                          entity;
                        </p>
                        <p>
                          engaging in any data mining, data harvesting, data
                          extracting or any other similar activity in relation
                          to this Website, or while using this Website;
                        </p>
                        <p>
                          using this Website to engage in any advertising or
                          marketing;
                        </p>
                        <p>
                          Certain areas of this Website are restricted from
                          access by you and WE may further restrict access by
                          you to any areas of this Website, at any time, in its
                          sole and absolute discretion. Any user ID and password
                          you may have for this Website are confidential and you
                          must maintain confidentiality of such information.
                        </p>
                        <p>
                          <strong>4. Your Content</strong>
                        </p>
                        <p>
                          In these Website Standard Terms And Conditions, “Your
                          Content” shall mean any audio, video, text, images or
                          other material you choose to display on this Website.
                          With respect to Your Content, by displaying it, you
                          grant Beijing Blue Cube Technology Company Ltd.&nbsp;a
                          non-exclusive, worldwide, irrevocable,
                          royalty-free&nbsp;(accept where agreed in this case
                          the resources page), sub-licensable license to use,
                          reproduce, adapt, publish, translate and distribute it
                          in any and all media.
                        </p>
                        <p>
                          Your Content must be your own and must not be
                          infringing on any third party’s rights.Beijing Blue
                          Cube Technology Company Ltd.&nbsp;reserves the right
                          to remove any of Your Content from this Website at any
                          time, and for any reason, without notice.
                        </p>
                        <p>
                          <strong>5. No warranties</strong>
                        </p>
                        <p>
                          This Website is provided “as is,” with all faults,
                          and&nbsp;Beijing Blue Cube Technology Company
                          Ltd.&nbsp;makes no express or implied representations
                          or warranties, of any kind related to this Website or
                          the materials contained on this Website. Additionally,
                          nothing contained on this Website shall be construed
                          as providing consult or advice to you.
                        </p>
                        <p>
                          <strong>6. Limitation of liability</strong>
                        </p>
                        <p>
                          In no event shall Beijing Blue Cube Technology Company
                          Ltd.&nbsp;, nor any of its officers, directors and
                          employees, be liable to you for anything arising out
                          of or in any way connected with your use of this
                          Website, whether such liability is under contract,
                          tort or otherwise, and Beijing Blue Cube Technology
                          Company Ltd. , including its officers, directors and
                          employees shall not be liable for any indirect,
                          consequential or special liability arising out of or
                          in any way related to your use of this Website. This
                          is especially true of any copyrighted material that
                          you place onto the website and endeavour to profit
                          off- we will abide by the law and share information
                          with legal entities.
                        </p>
                        <p>
                          <strong>7. Indemnification</strong>
                        </p>
                        <p>
                          You hereby indemnify to the fullest extent Beijing
                          Blue Cube Technology Company Ltd. from and against any
                          and all liabilities, costs, demands, causes of action,
                          damages and expenses (including reasonable attorney’s
                          fees) arising out of or in any way related to your
                          breach of any of the provisions of these Terms.
                        </p>
                        <p>
                          <strong>8. Severability</strong>
                        </p>
                        <p>
                          If any provision of these Terms is found to be
                          unenforceable or invalid under any applicable law,
                          such unenforceability or invalidity shall not render
                          these Terms unenforceable or invalid as a whole, and
                          such provisions shall be deleted without affecting the
                          remaining provisions herein.
                        </p>
                        <p>
                          <strong>9. Variation of Terms</strong>
                        </p>
                        <p>
                          Beijing Blue Cube Technology Company Ltd. is permitted
                          to revise these Terms at any time as it sees fit, and
                          by using this Website you are expected to review such
                          Terms on a regular basis to ensure you understand all
                          terms and conditions governing use of this Website.
                        </p>
                        <p>
                          <strong>10. Assignment</strong>
                        </p>
                        <p>
                          Beijing Blue Cube Technology Company Ltd.&nbsp;shall
                          be permitted to assign, transfer, and subcontract its
                          rights and/or obligations under these Terms without
                          any notification or consent required. However, .you
                          shall not be permitted to assign, transfer, or
                          subcontract any of your rights and/or obligations
                          under these Terms.
                        </p>
                        <p>
                          <strong>11. Entire Agreement</strong>
                        </p>
                        <p>
                          These Terms, including any legal notices and
                          disclaimers contained on this Website, constitute the
                          entire agreement between Beijing Blue Cube Technology
                          Company Ltd.&nbsp;and you in relation to your use of
                          this Website, and supersede all prior agreements and
                          understandings with respect to the same.
                        </p>
                        <ol start={12}>
                          <li>
                            <p>
                              <strong>Fees&nbsp;</strong>
                            </p>
                          </li>
                        </ol>
                        <p>
                          By agreeing to these terms and conditions you allow
                          Beijing Blue Cube Technology Company Ltd. to deduct
                          10% from any monies sent or received for the purposes
                          of site maintenance, administration and fees to 3
                          <sup>rd</sup> party payment processing. Any payments
                          will be processed as quickly as possible, should any
                          dispute arise then we have the right to reclaim fee
                          amount for the sender or withhold next payment for the
                          purpose of reimbursement if deemed necessary.
                        </p>
                        <p>
                          <strong>12.1 REFUND POLICY</strong>
                        </p>
                        <p>
                          I)There are&nbsp;
                          <em>
                            <strong>
                              no refunds for student resources and teachers
                              lesson plans
                            </strong>
                          </em>{" "}
                          as you have the opportunity to sample the papers
                          before being bought. Therefore, please evaluate
                          properly before purchase.
                        </p>
                        <p>
                          II) Forum question by students can be refunded if
                          requested WITHIN 24 Hours (full refund will be given)
                          if we deem your questions were not adequately answered
                          (or not answered)
                        </p>
                        <p>III) NO REFUNDS after 24 hours pass</p>
                        <ol start={12}>
                          <li>
                            <p>
                              <strong>Abuse&nbsp;</strong>
                            </p>
                          </li>
                        </ol>
                        <p>
                          Any abuse, harassment or bullying of other members on
                          this site is forbidden and may result in account
                          deletion. Any member must not solicit any other
                          members for personal contact details this could result
                          in account deletion. No advertising for recruitment,
                          goods or services is permitted and may result in
                          account deletion. Any false accusation about other
                          members for abuse, harassment or bullying may end with
                          account deletion.
                        </p>
                        <ol start={12}>
                          <li>
                            <p>
                              <strong>Liabilities</strong>
                            </p>
                          </li>
                        </ol>
                        <p>
                          Any liability issues arising from the use of this
                          site, the user agrees to a 30 day arbitration period.
                          If after this period agreement cannot be met user has
                          the right to take the dispute to court in Beijing,
                          China. Any legal action must be made within 1 year
                          from the notification of disagreement.
                        </p>
                        <p>
                          Beijing Blue Cube Technology Company Ltd. does not
                          condone or sanction plagiarism and as such we ask
                          students to be aware of their own universities
                          policies as we will not accept responsibility for any
                          actions taken by your schools.
                        </p>
                        <ol start={12}>
                          <li>
                            <p>
                              <strong>Copyrighted Material</strong>
                            </p>
                          </li>
                        </ol>
                        <p>
                          <strong>
                            Resources and Lesson plans should not be copyrighted
                            or plagiarised work of any kind and we forbid any
                            uploading of such content any user violating this
                            will have their accounts removed or suspended and we
                            take no legal responsibility for such abuse by users
                          </strong>
                        </p>
                        <ol start={12}>
                          <li>
                            <p>
                              As we use we chat pay for ALL transactions at
                              present on registering with our app/website you
                              agree to allow us to bind your we chat accounts to
                              make and receive payments. This agreement will not
                              affect your account and we will not use your we
                              chat ID for any other purposes.
                            </p>
                          </li>
                        </ol>
                        <ol start={12}>
                          <li>
                            <p>
                              <strong>Tax -&nbsp;</strong>Any income earned on
                              our platform is the sole responsibility of the
                              user to declare to the relevant tax authority
                              within your jurisdiction. We take no
                              responsibility for any earned income via the
                              website or app for taxation purposes
                            </p>
                          </li>
                        </ol>
                        <p>
                          <br />
                        </p>
                        <p>
                          <br />
                        </p>
                        <ol start={12}>
                          <li>
                            <p>
                              <h1>Privacy Policy</h1>
                            </p>
                          </li>
                        </ol>
                        <p>
                          We only retain the collected information for the time
                          required to provide you with the services you need. We
                          will protect stored data in a commercially acceptable
                          manner to prevent loss and theft, as well as
                          unauthorized access, disclosure, replication, use or
                          modification. These will only be used to help you
                          provide services and register on the platform. Unless
                          required by law, we will not disclose or share any
                          personally identifiable information with third
                          parties.
                        </p>
                        <p>
                          <strong>The information we may collect</strong>
                        </p>
                        <p>
                          <span size={3}>
                            For the purposes of using our services we will
                            collect your email, we chat account ID , telephone
                            /device ID and if you are a university student ,
                            your university and your course of study. These will
                            only be used to help provide services to you and for
                            registration on the platform.&nbsp;
                          </span>
                        </p>
                        <p>
                          We only retain collected information for as long as
                          necessary to provide you with your requested service.
                          What data we store, we’ll protect within commercially
                          acceptable means to prevent loss and theft, as well as
                          unauthorized access, disclosure, copying, use or
                          modification.
                        </p>
                        <p>
                          We don’t share any personally identifying information
                          publicly or with third-parties, except when required
                          to by law.
                        </p>
                        <p>
                          Our website may link to external sites that are not
                          operated by us. Please be aware that we have no
                          control over the content and practices of these sites,
                          and cannot accept responsibility or liability for
                          their respective privacy policies.
                        </p>
                        <p>
                          <strong>How we may collect the information</strong>
                        </p>
                        <p>
                          We use a 3<sup>rd</sup> party SDK provided by Aurora
                          Software “cn.jpush.android"&nbsp;this SDK is used to
                          allow for notifications across various android devices
                          to provide messages for your convenience, the devices
                          cover : Huawei&nbsp;(&nbsp;Huawei or Huawei AG Connect
                          SDK), Xioami (&nbsp;Xioami Push SDK) and OPPO
                          (&nbsp;OPPO Push SDK)&nbsp;for&nbsp;android devices
                          -&nbsp;NO PERSONAL INFORMATION IS TAKEN, information
                          is only for notifications and for no other purposes.
                          Information is to specifically allow notifications
                          that are related to you, for example, teacher has sent
                          you homework or graded your paper or someone has
                          answered a question you posted.
                        </p>
                        <p>
                          We Chat Pay SDK is installed which binds your We Chat
                          ID to your Perfect Homework/i-Revu user account and is
                          used only for users to make and receive payments no
                          other personal information is taken.
                        </p>
                        <p>
                          You are free to refuse our request for your personal
                          information, with the understanding that we may be
                          unable to provide you with some of your desired
                          services.
                        </p>
                        <p>
                          Your continued use of our website will be regarded as
                          acceptance of our practices around privacy and
                          personal information. If you have any questions about
                          how we handle user data and personal information, feel
                          free to contact us.
                        </p>
                        <p>
                          <strong>How we may use the information</strong>
                        </p>
                        <p>
                          The information collected will be used for sending you
                          notifications about activities occurring on the
                          platform , example, your teacher has sent you homework
                          (device ID).
                        </p>
                        <p>
                          To receive payments or make payments for services
                          provided on the platform (we chat pay ID)
                        </p>
                        <p>
                          To register you on the platform to access our services
                          (email )
                        </p>
                        <p>
                          To help us design new services and improve our
                          existing services; Let us know more about how you
                          access and use our services, so as to respond to your
                          personalized needs
                        </p>
                        <p>
                          This policy is effective as of 9 September 2020&nbsp;,
                          by&nbsp;Beijing Blue Cube Technology Company Ltd for
                          the use of our product Perfect Homework also known in
                          English as i-Revu.
                        </p>
                        <p>
                          Company Address: J051, Block G, 45 Zhongguancun Zhi
                          Zao Da Jie, Cheng Fu Road, Hadian District, Beijing.
                        </p>
                        <p>
                          Email:&nbsp;
                          <u>
                            <a href="mailto:contact@irevu.org">
                              <strong>contact@irevu.org</strong>
                            </a>
                          </u>
                        </p>
                        <p>
                          <strong>Subscriptions</strong>
                        </p>
                        <p>
                          Any subscriptions for services provided on our website
                          will be payable up-front before access to our services
                          unless agreed to by Beijing Blue Cube Technology
                          Company Ltd (free trials etc).&nbsp;Your subscription
                          allows you access to the classroom management feature
                          so that you can send and grade students homework
                          seamlessly by adding classes and students to those
                          classes&nbsp;. Any cancellations before a new
                          subscription period start date will be canceled any
                          subscription canceled after new date will not be
                          refunded under this agreement and cancellation will
                          start&nbsp;at the end of current subscription period.
                          For subscriptions longer than 1 month refunds will be
                          made for any months which have not been used.
                        </p>
                        <p>
                          <br />
                        </p>
                        <p>
                          To cancel your subscription simply click on
                          subscriptions in the website app and cancel
                          subscription.
                        </p>
                        <ol start={12}>
                          <li>
                            <p>
                              <strong>Data</strong>
                            </p>
                          </li>
                        </ol>
                        <p>
                          Beijing Blue Cube Technology Company Ltd. dos not
                          accept any responsibility for loss of data relating to
                          course materials that you have written , we suggest
                          that you back your data on your computer
                        </p>
                        <p>
                          <strong>21</strong>
                          <strong>. Governing Law &amp; Jurisdiction</strong>
                        </p>
                        <p>
                          These Terms will be governed by and construed in
                          accordance with the laws of China and you submit to
                          the non-exclusive jurisdiction of the state and
                          federal courts located in Beijing for the resolution
                          of any disputes.
                        </p>
                      </>
                    </p>
                  ) : (
                    <p className="large">
                      <>
                        <p>1. 介绍</p>
                        <p>
                          本网页所载的网站条款及条件(以下简称“条款”或“本网站标准条款及条件”)将指导您对本网站的使用，包括本网站内的所有网页(以下统称“本网站”)。这些条款对您使用本网站完全有效，当您使用本网站时，即表示您完全接受本网站所载的所有条款和条件。若您对本网站任何标准条款及条件有任何异议，请不要使用本网站。
                        </p>
                        <p>2. 知识产权</p>
                        <p>
                          除了您自己的内容（您可能选择将其包含在本网站上）之外，根据这些条款，北京蓝立方科技有限公司和/或其许可方拥有本网站所含知识产权和材料的所有权利，并保留所有此类权利。仅被授权时才能查看本网站包含的材料，但须遵守本条款中规定的限制。
                        </p>
                        <p>3. 限制</p>
                        <p>使用本网站时受到以下限制：</p>
                        <p>在任何媒体上发布本网站材料；</p>
                        <p>销售、转授权或者以其他方式商业化本网站材料；</p>
                        <p>公开传阅本网站付费资料；</p>
                        <p>以任何损害或可能损害本网站的方式使用本网站；</p>
                        <p>以任何影响用户访问本网站的方式使用本网站;</p>
                        <p>
                          违反适用的法律法规使用本网站，或以对本网站或任何个人或商业实体造成或可能造成损害的方式使用本网站;
                        </p>
                        <p>
                          或在使用本网站时，从事任何与本网站有关的数据挖掘、数据收集、数据提取或任何其他类似活动;
                        </p>
                        <p>使用本网站进行任何广告或营销活动;</p>
                        <p>
                          <u>
                            本网站的某些区域已被限制让您访问，而我们可在任何时候自行及绝对酌情决定限制您访问本网站的任何区域。您在本网站使用的任何用户
                          </u>
                          <u>ID和密码</u>
                          <u>均属保密信息，需注意安全</u>
                          <u>。&nbsp;</u>
                        </p>
                        <p>4. 浏览内容</p>
                        <p>
                          在本网站标准条款和条件中，“浏览内容”指您选择在本网站上显示的任何音频、视频、文本、图像或其他材料。就内容而言，您
                          <u>
                            即授予北京蓝立方科技有限公司一个非独家的、全球范围内、不可撤销、免版税的
                          </u>
                          <u>(在此情况下接受资源页)、可再授权的许可</u>
                          ，以在任何及所有媒体上使用、复制、改编、出版、翻译和分发您的内容。
                        </p>
                        <p>
                          您的发布内容必须是原创的，不得侵犯任何第三方的权利。北京蓝立方科技有限公司保留在不另行通知的情况下，随时以任何理由从本网站删除您的任何内容的权利。
                        </p>
                        <p>5. 无担保</p>
                        <p>
                          本网站按“原样”提供，无任何瑕疵，北京蓝立方科技有限公司对与本网站或本网站所载材料不作任何明示或暗示的陈述或保证。此外，本网站的任何内容均不应被解释为向您提供咨询或建议的许可或权利。
                        </p>
                        <p>6. 责任</p>
                        <p>
                          在任何情况下，北京蓝立方科技有限公司或其任何高级职员、董事和员工均不对您使用本网站而产生的或与之相关的任何事情承担责任，无论该责任是否属于合同、侵权或其他责任，以及北京蓝立方科技有限公司，包括其高级职员，董事及雇员对因您使用本网站而引致的任何间接、间接或特别责任概不负责。对于您放置在本网站上并试图从中获利的任何受版权保护的材料，我们将遵守法律，并与法律实体共享信息。
                        </p>
                        <p>7. 赔偿</p>
                        <p>
                          如因您违反本条款的任何规定而产生的或以任何方式与之相关的任何及所有责任、成本、要求、诉因、损害赔偿和费用（包括合理的律师费），需赔偿北京蓝立方科技有限公司。
                        </p>
                        <p>8. 可分割性</p>
                        <p>
                          如果根据任何适用法律发现本条款的任何条款不可执行或无效，则该等条款应在不影响本协议其余条款的情况下予以删除。
                        </p>
                        <p>9. 条款变更</p>
                        <p>
                          北京蓝立方科技有限公司有权在其认为合适的任何时候修改这些条款，您需要定期审查这些条款，以确保您了解本网站使用的所有条款和条件。
                        </p>
                        <p>10. 转让</p>
                        <p>
                          北京蓝立方科技有限公司转让和分包其在本条款下的权利和/或义务，无需通过第三方通知或同意，但用户不得转让或分包其在本条款下的任何权利和/或义务。
                        </p>
                        <p>11. 完整协议</p>
                        <p>
                          这些条款，包括本网站上包含的任何法律声明和免责声明，构成北京蓝立方科技有限公司与您之间关于您使用本网站的完整协议，并取代之前与此相关的协议。
                        </p>
                        <p>12. 费用</p>
                        <p>
                          通过此条款证明您允许北京蓝立方科技有限公司从发送或接收的任何款项中扣除10%，用于网站维护、管理和第三方支付处理费用。任何付款将尽快处理，如果出现任何争议，我们有权在必要时为发件人收回费用金额或扣留下一笔付款。
                        </p>
                        <p>12.1 退款协议</p>
                        <p>
                          &nbsp;（1）学生资源和教案不予以退款。在购买该产品之前，您可免费试用，所以请在试用期间确认是否购买。
                        </p>
                        <p>
                          &nbsp;（2）如果您没有充分回答（或没有回答）学生提出的问题，系统将在24小时内全额退款。
                        </p>
                        <p>&nbsp;（3）超过24小时后将不予以退款</p>
                        <p>13. 滥用</p>
                        <p>
                          本网站禁止对其他会员进行任何骚扰或辱骂等行为，帐户将被注销。任何会员不得向其他会员索取个人联络资料，否则可能导致帐户被删除。如刊登招聘、商品或服务广告等，帐户将被注销。任何诬告其他会员骚扰或辱骂等行为，帐户均将被注销。
                        </p>
                        <p>14. 负债</p>
                        <p>
                          任何因使用本网站而引起的责任问题，用户同意30天的仲裁期。如果在此期间协议不能达成，用户有权将争议提交北京市高级人民法院。任何法律行动必须在异议通知之日起1年内提出。
                        </p>
                        <p>
                          北京蓝立方科技有限公司不容忍或制裁抄袭行为，因此我们要求学生了解自己学校的政策，我们对贵校的任何行为不承担任何责任。
                        </p>
                        <p>
                          15.受版权保护的资料——资源和教案不应被剽窃或抄袭，我们禁止上传任何此类内容，任何违反此规定的用户将被注销其帐户，我们对用户的此类行为不承担任何法律责任。
                        </p>
                        <p>
                          16.
                          当您在我们的应用程序/网站使用微信注册时，您同意允许我们绑定您的微信账户来支付和接收付款。本协议不会影响您的帐户，我们不会将您的微信账号用于任何其他目的。
                        </p>
                        <p>17. 税收</p>
                        <p>
                          在平台上获得的任何收入由用户自行向相关税务机关申报。我们对通过网站或应用程序获得的任何收入不承担任何税务责任。
                        </p>
                        <p>
                          <strong>18.&nbsp;</strong><br/>
                          <h1>隐私政策</h1>
                        </p>
                        <p>
                          我们仅在为您提供所需服务所需的时间内保留收集的信息。我们将以商业上可接受的方式保护存储的数据，以防止丢失和被盗，以及未经授权的访问、披露、复制、使用或修改。这些将仅用于帮助您提供服务和在平台上注册。如非法律要求，我们不会公开或与第三方共享任何个人身份信息。
                        </p>
                        <p>
                          <br />
                        </p>
                        <p>
                          <strong>我们可能收集的信息</strong>
                        </p>
                        <p>
                          为了使用我们的服务，我们将收集您的电子邮件、我们的聊天帐户ID、电话/设备ID，如果您是大学生，还将收集您的大学和学习课程。我们的服务可能包含指向第三方网站或资源（「第三方服务」）的链接。此类第三方服务适用不同的服务条款和隐私政策，用户应查阅这些条款和隐私政策。我方对第三方服务的使用概不负责。
                        </p>
                        <p>
                          <br />
                        </p>
                        <p>
                          <strong>我们如何收集信息</strong>
                        </p>
                        <p>
                          我们使用极光软件"cn.jpush.android"提供的第三方SDK，此&nbsp;SDK
                          用于允许各种安卓设备上的通知，为您提供方便的消息，设备涵盖：华为（华为或华为支付），小米（小米支付）和OPPO（OPPO支付）等设备，信息仅用于通知。例如，老师已向您发送作业或给论文打分，或者有人回答了您发布的问题。
                        </p>
                        <p>
                          使用微信支付，将您的微信账号与本网站用户账号绑定，仅用于用户支付和收款，不会获取其他个人信息。
                        </p>
                        <p>
                          如您拒绝我们收集您个人信息的请求，我们可能无法为您提供所需的某些服务。
                        </p>
                        <p>
                          您继续使用我们的网站将被视为接受我们有关隐私和个人信息的做法。如果您对我们如何处理用户数据和个人信息有任何疑问，请随时与我们联系。
                        </p>
                        <p>
                          <strong>我们可能如何使用信息</strong>
                        </p>
                        <p>
                          向您发送有关平台上发生的活动的通知，如您的老师向您发送了作业（设备ID）。
                        </p>
                        <p>接收付款或支付平台上提供的服务（微信支付ID）；</p>
                        <p>在平台上注册您以访问我们的服务（电子邮件）；</p>
                        <p>
                          帮助我们设计新服务&nbsp;,改善我们现有服务;使我们更加了解您如何接入和使用我们的服务,从而针对性地回应您的个性化需求
                        </p>
                        <p>
                          <br />
                        </p>
                        <p>
                          本政策自2020年9月9日起实施，由北京蓝色魔方科技有限公司为我们的产品“完美功课”使用，产品英文名为“i-Revu”。
                        </p>
                        <p>
                          公司地址：北京市海淀区成府路中关村智造大街&nbsp;45
                          号&nbsp;G 座&nbsp;J051 。
                        </p>
                        <p>
                          电子邮箱:<strong>contact@irevu.org</strong>
                        </p>
                        <p>
                          <br />
                        </p>
                        <p>
                          <br />
                        </p>
                        <p>
                          <strong>订阅</strong>
                        </p>
                        <p>
                          <u>
                            除非北京蓝立方科技有限公司同意（免费试用等），否则在接受我们的服务之前，您需提前支付网站上提供服务的订阅费。
                          </u>
                          这样一来，可允许使用课堂管理功能，以便您通过将课程和学生添加，轻松发送和批改学生的作业。根据本协议,在新订阅之后取消的任何订阅将不予退还，取消将在当前订阅期结束时。对于超过1个月的订阅，我们会将未使用月份进行退款。
                        </p>
                        <p>
                          <br />
                        </p>
                        <p>19. 数据</p>
                        <p>
                          北京蓝立方科技有限公司对您所写的与课程材料有关的数据丢失不承担任何责任，我们建议您将您的数据备份到计算机上。
                        </p>
                        <p>20. 适用法律和管辖权</p>
                        <p>
                          这些条款将受中国法律管辖并根据中国法律解释，您将服从北京市高级人民法院的非专属司法管辖权以解决任何争议。
                        </p>
                      </>
                    </p>
                  )}
                {/* </Flip> */}
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
                  <li>
                    <a href="/bbctc">{t("bbct_ltd")}</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-8">
              <div className="row">
                <div className="col-md-6 col-sm-12">
                  <div className="footer_link_heading">
                    <h3>{t("table_of_content")}</h3>
                  </div>
                  <div className="footer_menu">
                    <ul>
                      <li>
                        <a href="/">{t("home")}</a>
                      </li>
                      <li>
                        <a href="/about-us">{t("about")}</a>
                      </li>
                      <li>
                        <a href="/english-tutorial">{t("english_tutoring")}</a>
                      </li>
                      <li>
                        <a href="/contact">{t("contact_us")}</a>
                      </li>
                      <li>
                        <a href="/privacy-policy">{t("agreement_terms")}</a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-md-6 col-sm-12">
                  <div className="footer_link_heading">
                    <h3>{t("contact_us")}</h3>
                  </div>
                  <div className="footer_menu">
                    <ul>
                      <li>
                        <a href="mailto:enquiries@irevu.org">
                          enquiries@irevu.org
                        </a>
                      </li>
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
export default PrivacyPolicy;
