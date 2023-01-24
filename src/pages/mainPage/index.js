import React, { useState } from 'react';
import '../../assets/css/bootstrap.css';
import '../../assets/css/style.css';
import logo1 from '../../assets/images/logo/favicon.png';
import logo_chi from '../../assets/images/logo/logo_chi.png';
import logoBlue from '../../assets/logo/logo_blue.png';
import university from '../../assets/images/university.jpg';
import student from '../../assets/images/student.jpg';
import teacher from '../../assets/images/teacher.jpg';
import testimonal from '../../assets/css/images/testimon.png';
import { Fade, Flip, Zoom } from 'react-reveal';
import fivePerson from '../../assets/images/slider-images/5person.jpg';
import { useTranslation } from 'react-i18next';
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
  MenuItem,
} from '@material-ui/core';

const MainPage2 = () => {
  const { t, i18n } = useTranslation();
  // constructor() {
  //   super();
  //   this.state = {
  //     menuForMob: false,
  //     openLangOptions: true,
  //     menuForSmall: false,
  //   };
  // }

  const [menuForMob, setMenuForMob] = useState(false);
  const [openLangOptions, setOpenLangOptions] = useState(true);
  const [menuForSmall, setMenuForSmall] = useState(false);
  const [check, setCheck] = useState(false);
  const handleClick = (lng) => {
    i18n.changeLanguage(lng);
    openLangsOptions();
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
    <body id='home_page' className='home_page'>
      {/* <!-- header --> */}
      <header className='header'>
        <div className='header_top_section'>
          <div className='header-container'>
            <div className='row'>
              <div className='col-lg-2'>
                <div className='full'>
                  <div className='logo'>
                    <a href='login'>
                      <img
                        src={t('login') == 'LOGIN' ? logo1 : logo_chi}
                        alt='#'
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div className='col-lg-10 site_information'>
                <div className='full'>
                  <div className='main_menu'>
                    <nav className='navbar navbar-inverse navbar-toggleable-md'>
                      <button
                        className='navbar-toggler'
                        type='button'
                        onClick={() => toggleThis()}
                      >
                        <i className='fa fa-bars'></i>
                        <i className='fa fa-close'></i>
                      </button>

                      <div
                        className=' navbar-collapse justify-content-md-center'
                        id='cloapediamenu'
                        style={{
                          display: menuForSmall ? 'block' : 'none',
                        }}
                      >
                        <ul className='navbar-nav'>
                          <li className='nav-item active'>
                            <a className='nav-link' href='bbctc'>
                              {t('bbct')}
                            </a>
                          </li>
                          <li className='nav-item active'>
                            <a className='nav-link color-aqua-hover' href='/'>
                              {t('home')}
                            </a>
                          </li>
                          <li className='nav-item'>
                            <a
                              className='nav-link color-aqua-hover'
                              href='english-tutorial'
                            >
                              {t('english_tutoring')}
                            </a>
                          </li>
                          <li className='nav-item'>
                            <a
                              className='nav-link color-grey-hover'
                              href='about-us'
                            >
                              {t('about')}
                            </a>
                          </li>
                          <li className='nav-item'>
                            <a
                              className='nav-link color-grey-hover'
                              href='privacy-policy'
                            >
                              {t('privacy_policy').toUpperCase()}
                            </a>
                          </li>
                          <li className='nav-item'>
                            <a
                              className='nav-link color-grey-hover'
                              href='register'
                            >
                              {t('register')}
                            </a>
                          </li>
                          <li className='nav-item'>
                            <a
                              className='nav-link color-grey-hover'
                              href='login'
                            >
                              {t('login')}
                            </a>
                          </li>
                          <li>
                            <div style={{ width: '90px', margin: '0 auto' }}>
                              <Button
                                aria-controls='simple-menu'
                                aria-haspopup='true'
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
                                <div className='dropdownDiv'>
                                  <ul>
                                    <li>
                                      <a
                                        style={{
                                          display: 'flex',
                                          justifyContent: 'space-between',
                                        }}
                                        href='#'
                                        onClick={() => handleClick('chi')}
                                      >
                                        Chinese
                                        {t('language') != 'LANGUAGE' && (
                                          <CheckCircleIcon
                                            name='CheckCircle'
                                            size={15}
                                            color='primary'
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
                                        href='#'
                                        onClick={() => handleClick('en')}
                                      >
                                        English
                                        {t('language') == 'LANGUAGE' && (
                                          <CheckCircleIcon
                                            name='CheckCircle'
                                            size={15}
                                            color='primary'
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
      <section className='main_full banner_section_top'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='full'>
              <div className='slider_banner'>
                <img className='img-responsive' src={fivePerson} alt='#' />
                <div className='slide_cont'>
                  <div className='slider_cont_inner'>
                    <Fade top duration={2000}>
                      <h3>
                        {t('welcome')}{' '}
                        <span className='text-my-blue'>{'i-Revu'}</span>
                      </h3>
                      <h4 style={{ color: '#d8d4d4' }}>
                        {t('text_welcome_1')}/{t('text_welcome_2')}
                      </h4>
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
      <section className='layout_padding section about_dottat'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12 text_align_center'>
              <div className='full heading_s1'>
                <Fade top duration={2000}>
                  {t('academic_english_support') ==
                  'Academic English Support' ? (
                    <h2>Features</h2>
                  ) : (
                    ''
                  )}
                </Fade>
              </div>
              <div className='full'>
                <Fade bottom duration={2000}>
                  {t('academic_english_support') ==
                  'Academic English Support' ? (
                    <p className='large'>
                      Perfect Homework (i-Rervu) is a website and application
                      where teachers can solve the problems of assigning and
                      correcting students' homework in one stop. At the same
                      time, it also provides students with opportunities to
                      communicate and discuss with teachers and classmates to
                      help them solve academic problems together.
                    </p>
                  ) : (
                    ''
                  )}
                </Fade>
              </div>
            </div>
          </div>

          <div className='col-md-12 text_align_center'>
            <div className='cours'>
              <Zoom duration={2000}>
                <img
                  className='img-responsive threePictures'
                  src={teacher}
                  alt='#'
                />
              </Zoom>
            </div>

            <div className='row pb-12 uni-teacher-student'>
              <div className='col-md-12 '>
                <Fade top duration={2000}>
                  {t('academic_english_support') ==
                  'Academic English Support' ? (
                    <h3 className='margin_top_30'>Teacher</h3>
                  ) : (
                    <h3 className='margin_top_30'>2个月免费试用</h3>
                  )}
                </Fade>
              </div>
              <div className='full'>
                <Fade bottom duration={2000}>
                  {t('academic_english_support') ==
                  'Academic English Support' ? (
                    <p className='large'>
                      After surveying 100’s of teachers we have found that 88%
                      wanted the below productivity solutions to help improve
                      their working lives
                    </p>
                  ) : (
                    <p className='large'>
                      完美功课
                      (i-revu)能够支持教师：智能工作，节省时间，赚取外快
                      在调查了100名教师后，我们发现88%的教师希望通过以下提高工作效率的方法来改善他们的工作生活
                    </p>
                  )}
                </Fade>
              </div>

              <div className='col-md-6'>
                <div className='col-md-12 '>
                  <Fade top duration={2000}>
                    {t('academic_english_support') ==
                    'Academic English Support' ? (
                      <h4 className='titletext'>Problem</h4>
                    ) : (
                      <h4 className='titletext'>问题</h4>
                    )}
                  </Fade>
                </div>
                <Flip right duration={2000}>
                  {t('academic_english_support') ==
                  'Academic English Support' ? (
                    <ul>
                      <li>
                        Teachers were tired of organising homework - 94% spend
                        at least 1 hour a week
                      </li>
                      <li>
                        Teachers were tired of carrying homework back and forth
                        - over 73%
                      </li>
                      <li>
                        Over 83% of teachers said the process was inefficient
                        and time consuming{' '}
                      </li>
                      <li>
                        Over 70% of teachers were frustrated with illegible
                        handwriting and having to meet students to discuss
                        papers or when students could not understand their
                        written feedback - sometimes spending 2 hours a week
                      </li>
                      <li>
                        Potentially losing 100’s of hours each year = to days
                        through process inefficiencies{' '}
                      </li>
                      <li>
                        Over 80% wished to free up this time for more
                        research/be with family or for personal interests
                      </li>
                      <li>A desire to subsidise their income</li>
                    </ul>
                  ) : (
                    <ul>
                      <li>
                        94%的教师每周至少花费1个小时，他们厌倦了组织家庭作业
                      </li>
                      <li>73%的教师厌倦了反复布置作业</li>
                      <li>超过83%的教师说这个过程是低效和耗时的</li>
                      <li>
                        超过70%的教师对字迹不清的手写作业感到头疼或者当学生不能理解教师反馈时，教师不得不与学生当面讨论，这有时每周花费2个小时
                      </li>
                      <li>低效的工作过程可能导致每年失去几小时甚至几天</li>
                      <li>
                        超过80%的教师希望利用这段时间可以做更多的研究，陪伴家人，或者开发个人兴趣
                      </li>
                      <li>赚取外快的渴望</li>
                    </ul>
                  )}
                </Flip>
              </div>
              <div className='col-md-6'>
                <div className='col-md-12 '>
                  <Fade top duration={2000}>
                    {t('academic_english_support') ==
                    'Academic English Support' ? (
                      <h4 className='titletext'>Solution</h4>
                    ) : (
                      <h4 className='titletext'>解决方案</h4>
                    )}
                  </Fade>
                </div>
                <Fade top duration={2000}>
                  {t('academic_english_support') ==
                  'Academic English Support' ? (
                    <h5>Smart Teachers are using i-Revu</h5>
                  ) : (
                    <h5>智慧的老师正在使用完美功课i-Revu</h5>
                  )}
                </Fade>
                <Flip left duration={2000}>
                  {t('academic_english_support') ==
                  'Academic English Support' ? (
                    <ul>
                      <li>
                        Easy submission of papers - no need to collect, download
                        and use paper - saves nearly <u> 100% of your time</u>
                      </li>
                      <li>
                        i-Revu solves the problems of lugging batches of
                        homework around or losing papers
                      </li>
                      <li>
                        i-Revu provides you the tools to manage and grade papers{' '}
                        <u>ensuring convenience and efficiency</u> (saving
                        additional time and frustration over illegible writing)
                      </li>
                      <li>
                        i-Revu automates sending back homework seamlessly
                        with-out individually emailing or organising papers
                        saving nearly 100% of your valuable time (
                        <u>
                          88% of teachers surveyed wanted the above productivity
                          benefits
                        </u>
                        )
                      </li>
                      <li>An opportunity to make more money</li>
                      <li>
                        Easily affordable monthly subscription (less than a
                        Starbucks coffee)
                      </li>
                    </ul>
                  ) : (
                    <ul>
                      <li>
                        轻松提交作业-不需要收集下载和使用纸张-节省了您几乎100%的时间
                      </li>
                      <li>
                        完美功课 (i-Revu) 解决了拖欠修改作业或者丢失作业的问题
                      </li>
                      <li>
                        完美功课 (i-Revu)
                        为你提供管理和评分的工具，确保方便和高效（节省额外的时间和避免对模糊的字迹感到头疼的烦恼）
                      </li>
                      <li>
                        完美功课 (i-Revu)
                        自动完成家庭作业的无缝发送，不需要单独发邮件或者整理，节省了近100%的宝贵时间（88%的受访教师希望获得上述提高工作效率的好处）
                      </li>
                      <li>有机会赚取更多的外快</li>
                      <li>轻松支付每月的订阅（比星巴克咖啡花销少）</li>
                    </ul>
                  )}
                </Flip>
              </div>
              <div>
                <Fade top duration={2000}>
                  {t('academic_english_support') ==
                  'Academic English Support' ? (
                    <h4 className='titletext techer-heading-left'>
                      i-Revu Rewards System:
                    </h4>
                  ) : (
                    <h4 className='titletext techer-heading-left'>
                      完美功课 (i-Revu) 奖励系统
                    </h4>
                  )}
                </Fade>
                <Flip right duration={2000}>
                  {t('academic_english_support') ==
                  'Academic English Support' ? (
                    <ul>
                      <li>
                        Answer only those questions you want to (no classes)
                      </li>
                      <li>
                        Provide teachers the opportunity if they choose to make
                        extra money by answering students questions or provide
                        feedback on many subjects(from 1 rmb - 100+ rmb per
                        question)
                      </li>
                      <li>
                        Providing teachers an opportunity to support students
                        with their academic English work and receive a fee (from
                        35 rmb - 100+ rmb)
                      </li>
                      <li>
                        Top 3 teachers with the highest points each month
                        receive BONUS MONEY - 300, 200, 100 respectively
                      </li>
                      <li>
                        Upload your best Lesson Plans, set a fee, if other
                        teachers download it you make money (example, you set a
                        fee of 10 rmb - 1000 teachers download it you make 9000
                        rmb (minus 10% platform fee)
                      </li>
                      <li>
                        Gain 50 points for answering questions and receive a fee
                      </li>
                      <li>
                        Gain points for signing-up teachers and students (100
                        for teachers and 50 for each student) - create a unique
                        referral link to send to others on i-Revu
                      </li>
                      <li>
                        Gain 5 points each time you grade a students paper
                      </li>
                      <li>
                        Win-Win - the more students and teachers you sign up the
                        more money you can make
                      </li>
                      <li>
                        Potentially saving 100’s of hours each year = to days
                      </li>
                      <li>
                        Improve your quality of life and make it more convenient
                      </li>
                      <li>
                        <a href='/register'>
                          <strong>Sign up </strong>
                        </a>
                        now and get started
                      </li>
                    </ul>
                  ) : (
                    <ul>
                      <li>只回答你想问的问题（不用上课）</li>
                      <li>
                        为教师提供机会，如果他们选择通过回答学生的问题或提供关于学科的反馈
                        来获得收入(每题1- 100+元)
                      </li>
                      <li>
                        为教师提供机会，来支持学生的学术英语工作并收取费用（35元到100元不等）
                      </li>
                      <li>
                        每月积分最高的前三名教师分别获得奖金300元、200元、100元
                      </li>
                      <li>
                        上传你的教案并设定一笔费用，如果其他老师下载你便可获得收入(例如，你设定10元-
                        1000老师下载你就赚9000元(其中减去10%平台费))
                      </li>
                      <li>回答问题可获得50分和收取费用</li>
                      <li>
                        注册的老师和学生可获得积分（每位老师注册可获得100分，每位学生注册可获得50分），给他人在完美功课
                        (i-Revu) 上分享链接
                      </li>
                      <li>当你每次批改作业的时候可获得5分</li>
                      <li>双赢-推荐更多的学生和老师注册便可得到更多收入</li>
                      <li>这可潜在的节省每年100小时，去做你想做的事情</li>
                      <li>改善生活质量，使其更方便快捷</li>
                      <li>
                        <a href='/register'>
                          <strong>立即报名 </strong>
                        </a>
                      </li>
                    </ul>
                  )}
                </Flip>
              </div>
            </div>
          </div>

          <div className='col-md-12 text_align_center'>
            <div className='cours'>
              <Zoom duration={2000}>
                <img
                  className='img-responsive threePictures'
                  src={student}
                  alt='#'
                />
              </Zoom>
            </div>

            <div className='row pb-12 uni-teacher-student'>
              <div className='col-md-12 '>
                <Fade top duration={2000}>
                  {t('academic_english_support') ==
                  'Academic English Support' ? (
                    <h3 className='margin_top_30'>Student</h3>
                  ) : (
                    <h3 className='margin_top_30'>学⽣</h3>
                  )}
                </Fade>
              </div>
              <div className='full'>
                <Fade bottom duration={2000}>
                  {t('academic_english_support') ==
                  'Academic English Support' ? (
                    <p className='large'>
                      After surveying 100’s of students we found that they all
                      had the below problems and needs in common no matter what
                      university, major or grade
                    </p>
                  ) : (
                    <p>
                      {' '}
                      经过对100名学生的调查，我们发现无论是何所大学、专业、成绩优秀与否的学生都有以下共同的问题和需求
                    </p>
                  )}
                </Fade>
              </div>
              <div className='col-md-6'>
                <div className='col-md-12 '>
                  <Fade top duration={2000}>
                    {t('academic_english_support') ==
                    'Academic English Support' ? (
                      <h4 className='titletext'>Problems/Needs</h4>
                    ) : (
                      <h4 className='titletext'>问题/需求</h4>
                    )}
                  </Fade>
                </div>
                <Flip right duration={2000}>
                  {t('academic_english_support') ==
                  'Academic English Support' ? (
                    <ul>
                      <li>
                        91% of students said they had difficulty in their
                        studies{' '}
                      </li>
                      <li>
                        0ver 89 % stated they had problems with English and
                        Maths
                      </li>
                      <li>
                        Over 90% wished they could get information quicker and
                        without confusion
                      </li>
                      <li>90% wanted more academic support</li>
                      <li>
                        Over 85% said that current support was expensive
                        (private support)
                      </li>
                      <li>
                        Over 93% wished for more flexible and cost effective
                        support
                      </li>
                    </ul>
                  ) : (
                    <ul>
                      <li>91%的学生表明他们在学习上面临难题 </li>
                      <li>超过89 %的学生表示在英语和数学方面需要帮助 </li>
                      <li>
                        超过90%的学生希望他们能够快速准确的获得有效知识信息
                      </li>
                      <li>90%的学生希望获得更多的学术支持 </li>
                      <li>超过85%的学生反映目前的学术帮助太贵了(指私教)</li>
                      <li>
                        超过93% 的学生希望得到更灵活和成本效益更高的学术支持
                      </li>
                    </ul>
                  )}
                </Flip>
              </div>
              <div className='col-md-6'>
                <div className='col-md-12 '>
                  <Fade top duration={2000}>
                    {t('academic_english_support') ==
                    'Academic English Support' ? (
                      <h4 className='titletext'>i-Revu Academic Support </h4>
                    ) : (
                      <h4 className='titletext'>完美功课 (i-Revu) 学术支持 </h4>
                    )}
                  </Fade>
                </div>
                <Fade top duration={2000}>
                  {t('academic_english_support') ==
                  'Academic English Support' ? (
                    <h5>Smart Students are using i-Revu</h5>
                  ) : (
                    <h5>聪慧的学生都在使用 完美功课i-Revu</h5>
                  )}
                </Fade>
                <Flip left duration={2000}>
                  {t('academic_english_support') ==
                  'Academic English Support' ? (
                    <ul>
                      <li>
                        Providing students with a platform to academically
                        develop through S2S (student to student) and T2S
                        (teacher to student) knowledge transfer
                      </li>
                      <li>
                        A platform to provide help with your educational
                        problems and have questions answered by professional
                        academics (experts in their field) and higher level
                        students (MA/Phd)
                      </li>
                      <li>
                        Providing a cost effective and flexible real time
                        solution to accommodate students needs starting from 0.5
                        rmb per question
                      </li>
                      <li>
                        Support English language learning, especially, IELTS,
                        TEM, TOEFEL and CET writing
                      </li>
                      <li>Proof reading service for academic English papers</li>
                      <li>
                        Assistance with personal statements for overseas
                        university applications
                      </li>
                    </ul>
                  ) : (
                    <ul>
                      <li>
                        通过S2S (student to student)和T2S (teacher to
                        student)进行知识转移，为学生提供学术发展的平台
                      </li>
                      <li>
                        为您的教育方面的疑惑提供帮助，并由专业学者(其领域的专家)和更高水平的学生(硕士/博士)回答问题。
                      </li>
                      <li>
                        提供一个有效的、灵活的实时解决方案，以满足学生的需求，每题起价0.5元
                      </li>
                      <li>
                        支持英语语言学习，特别是雅思、TEM、TOEFEL和CET写作
                      </li>
                      <li>学术英语论文校对服务</li>
                      <li>协助海外大学申请的个人陈述</li>
                    </ul>
                  )}
                </Flip>
              </div>
              <div>
                <Fade top duration={2000}>
                  {t('academic_english_support') ==
                  'Academic English Support' ? (
                    <h4 className='titletext techer-heading-left'>
                      i-Revu Rewards System:
                    </h4>
                  ) : (
                    <h4 className='titletext techer-heading-left'>
                      i-Revu奖励机制
                    </h4>
                  )}
                </Fade>
                <Flip right duration={2000}>
                  {t('academic_english_support') ==
                  'Academic English Support' ? (
                    <ul>
                      <li>
                        Each month the top 3 students with the highest points
                        wins MONEY- 300, 200, 100 rmb
                      </li>
                      <li>
                        Answer questions and gain 50 points and make money (from
                        0.5 rmb to 15 rmb for each question)
                      </li>
                      <li>
                        Upload your best papers and set a fee, if students
                        download you make money (for example your paper is 10
                        rmb - 1000 students download it you get 9000 rmb after
                        10% platform fee)
                      </li>
                      <li>
                        Top 3 teachers with the highest points each month
                        receive BONUS MONEY - 300, 200, 100 respectively
                      </li>
                      <li>
                        Upload your best Lesson Plans, set a fee, if other
                        teachers download it you make money (example, you set a
                        fee of 10 rmb - 1000 teachers download it you make 9000
                        rmb (minus 10% platform fee)
                      </li>
                      <li> Ask questions and gain 30 points </li>
                      <li> Give a like get 1 point </li>
                      <li>
                        Send a referral link from i-Revu and sign-up a teacher
                        from any university and get 100 points
                      </li>
                      <li>
                        Send a referral link from i-Revu, sign-up a fellow
                        student from any university and get 50 points
                      </li>
                      <li>
                        {' '}
                        Win-Win - the more students and teachers you sign up the
                        more money you can make{' '}
                      </li>
                      <li>
                        <a href='/register'>
                          <strong>Sign up </strong>
                        </a>
                        now and get started
                      </li>
                    </ul>
                  ) : (
                    <ul>
                      <li>每个月积分前三名的学生将获得300、200、100元的奖励</li>
                      <li>
                        回答问题，可获得50积分并得到收入(每题从0.5元到15元不等)
                      </li>
                      <li>
                        上传你的论文并设定费用，如果有学生下载你便可获得收入(例如你的论文是10元-
                        1000学生下载你得到9000元，其中收取10%的平台费)
                      </li>
                      <li>提出问题并获得30分</li>
                      <li>点一个赞可获得1分</li>
                      <li>
                        {' '}
                        从完美功课 (i-Revu)
                        发送一个推荐注册的分享链接，推荐一个大学的老师注册，可获得100分{' '}
                      </li>
                      <li>
                        {' '}
                        从完美功课 (i-Revu)
                        发送一个推荐注册的分享链接，推荐一个大学的学生注册，可获得50分{' '}
                      </li>
                      <li>双赢——你推荐注册的学生和老师越多，你赚的钱就越多</li>
                      <li>
                        <a href='/register'>
                          <strong>现在就注册并开始吧！</strong>
                        </a>
                      </li>
                    </ul>
                  )}
                </Flip>
              </div>
            </div>
          </div>

          <div className='col-md-12 text_align_center'>
            <div className='cours'>
              <Zoom duration={2000}>
                <img
                  className='img-responsive threePictures'
                  src={university}
                  alt='#'
                />
              </Zoom>
            </div>
            <div className='row pb-12 uni-teacher-student'>
              <div className='col-md-12 '>
                <Fade top duration={2000}>
                  {t('academic_english_support') ==
                  'Academic English Support' ? (
                    <h3 className='margin_top_30'>University</h3>
                  ) : (
                    <h3 className='margin_top_30'>大学</h3>
                  )}
                </Fade>
              </div>
              <Flip left duration={2000}>
                {t('academic_english_support') == 'Academic English Support' ? (
                  <ul
                  // style={{ padding: "0 15px" }}
                  >
                    <li>
                      Provide teachers with tools for efficient management of
                      schoolwork, improve academic and teaching efficiency,
                      thereby saving time and money.
                    </li>
                    <li>
                      Eliminate trivial matters (such as management homework,
                      etc.) to improve teachers' teaching enthusiasm.
                    </li>
                    <li>
                      Teachers don’t need to explain to students about
                      performance evaluation and homework management. A small
                      subscription fee can save a lot of time and money.
                    </li>
                    <li>
                      Faculty and staff can focus more on important research
                      work, and the academic research capabilities of
                      universities will be greatly improved.
                    </li>
                    <li>
                      Automated return of homework, teachers do not need to send
                      separate e-mails to each student, and do not need to
                      manage homework (83% of the faculty interviewed said that
                      this tool is urgently needed).
                    </li>
                    <li>
                      A professors' time is extremely valuable, especially
                      during their participation in major projects. They deal
                      with a large number of complicated tasks and cause the
                      school to lose more than 1,000 hours each year (time is
                      money) that could be used for academic research. If there
                      are 50,000 professors in China who spend 1 hour each month
                      on organizing and managing homework and other matters, the
                      entire teacher group will lose 50,000 hours per month (5
                      years), 20 million (assuming an hourly salary of 200 yuan)
                      .
                    </li>
                    <li>
                      <a href='/contact'>
                        <strong>Contact us for </strong>
                      </a>
                      a consultation…
                    </li>
                    {/*<li>
										In addition, our platform can vigorously promote the digital management of university archives, such as exam/course archives,
										thereby saving paper, space, money, and time <b> (protect the environment).</b>
									</li>
									<li>
										Students will get better development, get better grades and education,
										 and ultimately promote economic and social development.
									</li>
									<li>
									Promote environmental protection.
									</li>
									<li>
									Social responsibility-10% of net profit will be used for charity (determined by members' vote).
									</li>*/}
                  </ul>
                ) : (
                  <ul
                  // style={{ padding: "0 15px" }}
                  >
                    <li>
                      为教师提供高效管理作业的工具，提高学术和科研效率，从而节省时间和金钱。
                    </li>
                    <li>
                      避免了一些琐碎的事情（如批改管理作业等），进一步提高教师的教学积极性。
                    </li>
                    <li>
                      教师无需向学生逐一解释成绩判分规则和进行作业管理。少量的订阅费可以节省很多时间和金钱。
                    </li>
                    <li>
                      教师可以更加专注于重要的研究工作，这将有力促进高校的学术研究能力大大提高。
                    </li>
                    <li>
                      作业自动返给学生，教师不需要给每个学生单独发邮件，也不需要进行作业管理工作（83%的受访教师表示急需此功能。
                    </li>
                    <li>
                      教师的时间是非常宝贵的，尤其是在他们参与重要学术项目的时候。他们需要处理大量复杂的任务，会导致学校每年损失1000多小时(时间就是金钱)，
                      这些时间可以用于学术研究。如果中国有5万名教师每个月花1个小时来进行作业管理等其他事情，那么整个教师团队每个月将损失5万小时(5年)，奖金2000万元(假设每小时工资200元)。
                    </li>
                    <li>赶快联系我们来咨询吧！</li>
                  </ul>
                )}
              </Flip>
            </div>
            <div className='row pb-12 uni-teacher-student'>
              <div className='col-md-12 margin_top_30'>
                <Fade top duration={2000}>
                  {t('academic_english_support') ==
                  'Academic English Support' ? (
                    <h4 className='titletext techer-heading-left'></h4>
                  ) : (
                    <h4 className='titletext '>其他功能</h4>
                  )}
                </Fade>
              </div>
              <Flip left duration={2000}>
                {t('academic_english_support') == 'Academic English Support' ? (
                  ''
                ) : (
                  <ul
                  // style={{ padding: "0 15px" }}
                  >
                    <li>
                      此外，我们的平台可以大力推进大学生档案的数字化管理，
                      例如考试/课程档案，从而节省纸张、空间、金钱和时间（甚至保护环境）。
                    </li>
                    <li>
                      学生将得到更好的发展，取得更好的成绩和教育，最终会促进经济社会发展。
                    </li>
                    <li>这还将促进环保。</li>
                    <li>
                      我们也会履行社会责任——净利润的10%将用于慈善事业（这将由会员投票决定）。
                    </li>
                  </ul>
                )}
              </Flip>
            </div>
          </div>

          <div className='row pt-4'>
            {/* <div className="col-lg-12 text_align_center">
                <div className="full heading_s1">
                  <h2>Our Success Stories</h2>
                </div>
                <div className="full">
                  <p className="large">
                    In ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo
                    <br />
                    consequat. Duis aute irure dolor in re
                  </p>
                </div>
              </div> */}
            <div className='col-md-12 testimonial'>
              {/* <div className="full text_align_center">
                  <img src={testimonal} alt="#" />
                  <h3>
                    <span className="theme_color_text">koluda</span>
                    <br />
                    <small>Student</small>
                  </h3>
                </div> */}
              <div className='full margin_top_30 text_align_center other-benefits'>
                <Flip top duration={2000}>
                  {t('academic_english_support') ==
                  'Academic English Support' ? (
                    <h4>Other Benefits</h4>
                  ) : (
                    ''
                  )}
                </Flip>
                <Flip left duration={2000}>
                  {t('academic_english_support') ==
                  'Academic English Support' ? (
                    <ul>
                      <li>
                        In addition, our platform can vigorously promote the
                        digital management of university archives, such as
                        exam/course archives, thereby saving a lot of paper,
                        space, money, and time.
                      </li>
                      <li>
                        Students will get better development, get better grades
                        and education, and ultimately promote economic and
                        social development.
                      </li>
                      <li>Promote environmental protection.</li>
                      <li>
                        Social responsibility-10% of net profit will be used for
                        charity (determined by members' vote).
                      </li>
                    </ul>
                  ) : (
                    ''
                  )}
                </Flip>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- end section --> */}

      {/* <!-- footer --> */}
      <footer className='footer layout_padding' duration={2000}>
        <div className='container'>
          <div className='row'>
            <div className='col-md-4 col-sm-12'>
              <a href='index.html'>
                <img className='img-responsive' src={logoBlue} alt='#' />
              </a>
              <div className='footer_menu margin_top_30'>
                <ul>
                  <li>
                    <a href='/bbctc'>{t('bbct_ltd')}</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className='col-md-8'>
              <div className='row'>
                <div className='col-md-6 col-sm-12'>
                  <div className='footer_link_heading'>
                    <h3>{t('table_of_content')}</h3>
                  </div>
                  <div className='footer_menu'>
                    <ul>
                      <li>
                        <a href='/'>{t('home')}</a>
                      </li>
                      <li>
                        <a href='/about-us'>{t('about')}</a>
                      </li>
                      <li>
                        <a href='/english-tutorial'>{t('english_tutoring')}</a>
                      </li>
                      <li>
                        <a href='/contact'>{t('contact_us')}</a>
                      </li>
                      <li>
                        <a href='/privacy-policy'>{t('agreement_terms')}</a>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* <div className="col-md-6 col-sm-12">
									<div className="footer_link_heading">
										<h3>{t('contact_us')}</h3>
									</div>
									<div className="footer_menu">
										<ul>
											<li><a href="mailto:enquiries@irevu.org">enquiries@irevu.org</a></li>
										</ul>
									</div>
								</div> */}
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className='cpy'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
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
