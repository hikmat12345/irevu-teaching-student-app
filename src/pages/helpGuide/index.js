import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { Fonts, BgColor, Color } from "../../theme/index";
import { fade, withStyles } from "@material-ui/core/styles";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Box from "@material-ui/core/Box";

import { Header } from "../../components";
import { useTranslation } from 'react-i18next';
import { Fade, Flip, Zoom } from "react-reveal";
const styles = (theme) => ({
    container: {
      alignSelf: "flex-end",
      // paddingLeft: 250,
      paddingTop: 70,
      marginLeft: "80px",
      // paddingBottom: 20,
      textAlign: "center",
    },
    root: {
      maxWidth: 345,
      marginTop: 10,
      marginRight: 10,
    },
    media: {
      height: 140,
    },
    mainHeading: {
      fontSize: "20px",
      fontFamily: Fonts.Medium,
    },
    blueButton: {
      color: "#fff",
      height: "40px",
      borderRadius: "5px",
      backgroundColor: BgColor.myBlue,
      padding: "0 20px",
      "&:hover": {
        color: Color.textBlue,
        border: "1px solid" + Color.textBlue,
      },
    },
    center : {
      display:"inline-block",
      position:"relative"
    }
  });

  const HelpGuide = (props) => {
    const authUser = useSelector((store) => store.auth.user);
    const history = useHistory();
    const dispatch = useDispatch();
  
    const { classes } = props;
    const {t , i18n} = useTranslation()
    return (
      <>
        <Header history={history} />
        <Container maxWidth="xl" className={classes.container} style={{
          paddingLeft: "250px",
          marginLeft: "0",
        }}>
          <Box flexWrap="wrap" p={2} m={0} bgcolor="background.paper" className={classes.center}>
            <Typography className={classes.mainHeading}>{t('help_guide')}</Typography>
          </Box>
          {authUser.user_type == 2 ? 
          (<Box display="flex" justifyContent="space-between" alignItems="center">
    
                  {t("help_guide") == "Help guide" ? (
                    <p className="large">
                      <p>
                        <b> Home</b> <br />
                        <ul>
                          <li>As you can see the dashboard and homepage list the top 3 performers for both teachers and students</li>
                          <li>Your points are on the right under performances</li>
                          <li>To the top left is an icon (looks like a square) that opens the sidebar</li>
                        </ul>
                      </p>
                      
                      <p>
                        <b> Results</b> <br />
                        <ul>
                          <li>Here you can view all of your graded homework based on Class/ homework title </li>
                        </ul>
                      </p>
                      <p>
                        <b> Classes</b> <br />
                        <ul>
                          <li>In this tab you can view all of your courses and check for homework that has been given based on your class ID and homework title  </li>
                          <li>Clicking on the tabs will take you to the homework </li>
                          <li>If you just want to view and save for now enter by clicking on VIEW when you have finished select submit</li>
                          <li>You can then write your homework, spell check for accuracy and submit it back to your teacher (the editor allow you to upload videos and directly add images, graphs etc into the text fields - word count also allows you to keep track of the number of words you use  </li>
                          <li>To join a class click class enrol and either scan the QR code or enter the class ID your teacher provides </li>
                        </ul>
                      </p>
                      <p>
                        <b> Forum - Student questions</b> <br />
                        <ul>
                          <li>You get 3 free short student to student questions each month use them wisely </li>
                          <li>Tool for asking and answering students questions once you have accepted them (PLEASE RMEMBER TO PROVIDE CLEAR GUIDANCE ON EACH QUESTION YOU ANSWER, YOU MUST ONLY ACCEPT SHORT QUESTIONS IF YOU CAN ANSWER THEM QUICKLY - LONG ANSWERS YOU HAVE UP TO 1 HOUR AND YOU ONLY GET PAID AFTER 24 HOURS) </li>
                          <li>Students have the chance to ask you 5 questions for any clarification issues or problems so be clear and save yourself time</li>
                          <li>If you are having challenges with your homework simply ask a student or teacher for help using the forum</li>
                          <li>If you don’t ask questions or accept after 24 hours the money will be automatically sent and cannot be reimbursed</li>
                          <li>Another reason to get those referral QR codes out there, the more students on-board the more chances of making extra income</li>
                          <li>10% is deducted for platform fee </li>
                        </ul>
                      </p>
                      <p>
                        <b> Forum - Teachers</b> <br />
                        <ul>
                          <li>As in the student forum here you have the opportunity to ask experts a question (Teachers) the cost is higher so be sure before you ask </li>
                          <li>You have the chance to ask 5 questions for any clarification issues or problems</li>
                          <li>After receiving your answer and you don’t ask questions or accept after 24 hours the money will be automatically sent and cannot be reimbursed</li>
                          <li>You can also ask teachers to review your academic English writing papers - CET, TEM, IELTS , TOEFEL, KET and PET - simply select the correct type, pay the fee and write your paper for review</li>
                        </ul>
                      </p>
                    </p>
                  ) : (
                    <p className="large">
                      <p>
                        <b>概览 </b> <br />
                        <ul>
                          <li>概览中会显示排名前三的学生和教师的分数，并统计你成功邀请的好友数。被邀请人可通过填写你的邀请码成功注册。邀请一名学生获得50积分，邀请一名教师获得100积分。每月排名前三的学生分别可以得到300元、200元和100元的奖金。</li>
                        </ul>
                        
                      </p>

                      <p>
                        <b>提问 </b> <br />
                        <ul>
                          <li> 你可以向指定论坛求助一些学业上的问题。这里的学生或者教师会给出答案和解决方法，清楚详细的描述问题更有利于得到准确的答案。如果你仍对答案感到困惑，你有5次追加提问的机会。如果你对答案感到满意，请点击“接受”支付奖金，超过24小时未接受，奖金将自动发放给答题者。</li>
                        </ul>
                       
                      </p>
                       <p>
                        <b>论坛：</b> <br />
                        <ul>
                          <li>在论坛里学生可以向教师和其他学生提出问题。</li>
                          <li>你可以从学生的问题中选择你想要回答的问题，回答问题时请注意时间限制，短问题限制时长为15分钟内，长问题限制时长为2小时内。奖金的多少依据时长判定，至少0.5元。</li>
                          <li>同时，回答一个问题也能得到50积分。</li>
                          <li>接受问题之后，你可以直接回答问题或去你“正在回答的问题”中回答。如果你放弃回答这个问题，你可以在“正在回答的问题”中删除这个问题。</li>
                        </ul>
                      </p>
                      <p>
                        <b>班级：</b> <br />
                        <ul>
                          <li>你的班级：在这里你可以找到你所报名的所有课程的列表，点击课程可以查看作业和成绩。</li>
                          <li>作业：这里有你所有班级的已批改的所有作业。点击“未批改”查看你已提交未批改的作业。</li>
                          <li>加入班级：只需点击“加入班级”选项，查找你想加入的班级名称或者复制粘贴老师分享的邀请链接即可加入。
                          </li>
                          <li>资源：你可以浏览其他学生上传的资源，选择你想要的购买并下载。上传的论文分数应当在总分的85%以上，所以请在下载之前检查质量。</li>
                          <li>你的资源：这里有你已经上传的所有资源的列表。现在最多只允许上传五个资源，允许删除旧资源上传新资源。</li>
                          <li>创建资源：上传一个资源，添加标题和描述，选择年级并设置一个价格。你可以通过分享优秀论文获得收益。</li>
                          <li>学术英语：这里的问题主要是关于英语和学术英语。你可以提出问题，学术英语问题仅供教师回答。回答问题请注意时间限制—学术英语写作（专业英语、大学英语考试、雅思和托福），时间限制为12个小时，</li>
                          <li></li>
                        </ul>
                      </p>
                      <p>
                        <b>-选择价格-</b> <br />
                        <ul>
                          <li>专业英语和大学英语考试指导 付费25元 雅思和托福指导 付费50元</li>
                          <li>如果你有更多的需要，请直接联系我们，并提供尽可能多的信息。</li>
                          <li>邀请链接：通过邀请链接和邀请码邀请同学和教师可以获得额外的积分。如果有学生通过你分享的邀请码注册，你将获得50积分，如果有教师通过你分享的邀请码注册，你将获得100积分。</li>
                        </ul>
                        </p>
                    </p>
                  )}
              </Box>) : (<Box display="flex" justifyContent="space-between" alignItems="center">
    
                  {t("help_guide") == "Help guide" ? (
                    <p className="large">
                      <p>
                        <b> Home</b> <br />
                        <ul>
                          <li>As you can see the dashboard and homepage list the top 3 performers for both teachers and students</li>
                          <li>Your points are on the right under performances</li>
                          <li>To the top left is the icon (looks like a square) that opens the sidebar </li>
                        </ul>
                      </p>
                      <p>
                        <b> Earn Points</b> <br />
                        <ul>
                          <li><b>50 points for answering a question </b></li>
                          <li>points for signing-up teachers and students (100 for teachers and 50 for each student - referrals)</li>
                          <li>Gain 5 points each time you grade a students paper (for each paper not whole class) </li>
                        </ul>
                      </p>
                      <p>
                        <b> Classes</b> <br />
                        <ul>
                          <li>This is one of the most important parts for teachers, here you can create your classes, send and grade homework and add students to classes. </li>
                          <li>To create a class , click on the create courses tab, then give your class a name that is related so it is easy for you to remember (e.g. College English 1)</li>
                          <li>Simply click create class</li>
                        </ul>
                      </p>
                      <p>
                        <b> Adding Students</b> <br />
                        <ul>
                          <li>Adding students is simple BUT you must get your students registered first on the platform</li>
                          <li>First click on my classes tab, you will see a list of courses you created SIMPLY either show the QR code to students on the projector and ask them to scan on their app or send the class ID to students. They add after logging in the website/app and your done.</li>
                        </ul>
                      </p>
                      <p>
                        <b> Create Homework</b> <br />
                        <ul>
                          <li>This is where you can give your students homework, click crate assignment/homework , in the text box give your homework a title with any instructions your students must follow, Give them a deadline date and time </li>
                          <li>The Duration/Overtime , you can if you wish give them an extra 5 mins for example over the deadline time. If NO extra time over deadline time select 0</li>
                          <li>Then press submit and your students will be sent the homework assignment</li>
                        </ul>
                      </p>
                      <p>
                        <b> Grade Homework go to  Classes - Homework/Assignmenrts </b> <br />
                        <ul>
                          <li>Once your deadline is up you can simply view the homework here </li>
                          <li>All homework is under each class ID, click on the class ID and then click on the homework you sent </li>
                          <li>A list of all the students who submitted your homework will be here with a link to their assignment click on them and you will see it in an editing tool </li>
                          <li>Now simply grade their work stating errors and where they could have done better (USE RED TEXT COLOUR FOR GRADING) or simply leave a comment in the comments box</li>
                          <li>Once you have graded give the assignment a score %/a,b etc in the box below and press submit - DONE  </li>
                          <li>PLEAASE NOTE ONCE PAPERS HAVE BEEN GRADED AND SCORED AND SUBMITTED THEY CANNOT BE ALTERED</li>
                          <li>After you grade each paper a green √ will appear next to it to help you know which papers you have already graded </li>
                        </ul>
                      </p>
                      <p>
                        <b> Lesson Plans </b> <br />
                        <ul>
                          <li>This is an opportunity to potentially allow you to make extra income - upload any original (non-copyrighted) lesson plans you have created - fill out the necessary information and provide teachers notes if needed and set a price and post </li>
                          <li>If other teachers like your plan and download it you make money (-10% platform fee), so if you have a great plan and set it for 5rmb and 1000 teachers download it you make 4500 rmb :)</li>
                          <li>Another reason to get those referral QR codes out there, the more teachers on-board the more chances of making extra income</li>

                        </ul>
                      </p>
                      <p>
                        <b> Forums - Students Questions </b> <br />
                        <ul>
                          <li>Here is the chat tool for answering students question once you have accepted them (PLEASE RMEMBER TO PROVIDE CLEAR GUIDANCE ON EACH QUESTION YOU ANSWER, YOU MUST ONLY ACCEPT SHORT QUESTIONS IF YOU CAN ANSWER THEM QUICKLY - LONG ANSWERS YOU HAVE UP TO 1 HOUR AND YOU ONLY GET PAID AFTER 24 HOURS)  </li>
                          <li>Students have the chance to ask you questions for any clarification issues or problems so be clear and save yourself time</li>
                          <li>There is also an option for students to send their academic English writing papers for tests for review (KET, PET, CET, TEM, IELTS and TOEFEL) the prices range from 17.5 for KET and PET , CET and TEM 4 (25rmb) CET 6 and TEM 8 - 35rmb and IELTS/TOEFEL 55 rmb</li>
                          <li>Please note again there is a 10% platform fee</li>
                        </ul>
                      </p>
                      <p>
                        <b> Referral Link/Earn Points </b> <br />
                        <ul>
                          <li>Here you can earn extra points towards the monthly competition where you can potentially win 300 rmb- simply send the QR code out to teachers/students individually or in groups - the code works for both so don’t worry send the code if a teacher or student signs up to the platform you will receive points (100/50 respectively)  </li>
                          <li>Remember the more teachers and students that sign up the more chances you have of earning money (win-win)</li>
                        </ul>
                      </p>
                      <p>
                        <b> Wallet </b> <br />
                        <ul>
                          <li>Wallet is where you can add money to buy lesson plans, withdraw money that you have earned and refund any monies from questions (if required) - we use we chat pay at present - </li>
                          <li>No Refunds can be given for lesson plans as they are sold as seen</li>
                          <li>There maybe a 0.001 % withdrawal fee from we chat </li>
                        </ul>
                      </p>
                      <p>
                        <b> Account </b> <br />
                        <ul>
                          <li>To change any personal details or school name or ID etc - simply click on the pic icon on the top right and make any necessary changes - remember to press save</li>
                        </ul>
                      </p>
                      <p>
                        <b> Change Language </b> <br />
                        <ul>
                          <li>At the bottom of the sidebar is the change language option click on English and your done - this can also be done at the log in stage (BUT SHOULD BE DONE FROM LOGIN PAGE) <br/>
                          If you have any other question feel free to contact us :)

                          </li>
                        </ul>
                      </p>
                    </p>
                  ) : (
                    <p className="large">
                      <p>
                        <b>概览：</b> <br />
                        <ul>
                          <li>概览中会显示排名前三的学生和教师的分数，并统计了你成功邀请的好友数。被邀请人可通过填写你的邀请码成功注册。邀请一名学生获得50积分，邀请一名教师获得100积分。每月排名前三的学生分别可以得到300元、200元和100元的奖金。</li>
                        </ul>
                        
                      </p>
                      <p>
                        <b>论坛：</b> <br />
                        <ul>
                          <li>在论坛里学生可以向教师和其他学生提出问题。</li>
                          <li>你可以从学生的问题中选择你想要回答的问题，回答问题时请注意时间限制，短问题限制时长15分钟，长问题限制时长2小时。奖金的多少依据时长判定，至少0.5元。同时，回答一个问题也能得到50积分。</li>
                          <li>同时，回答一个问题也能得到50积分。</li>
                          <li>接受问题之后，你可以直接在论坛里回答问题。如果你放弃回答这个问题，你可以点击问题并选择“离开”。</li>
                          <li>请记住学生如果对答案有疑问可以有5次追加提问的机会，所以请清楚的叙述答案以节约您的时间。</li>
                        </ul>
                        
                      </p>
                      <p>
                        <b>班级：</b> <br />
                        <ul>
                          <li>你的班级：这里有你的创建的所有班级。你可以为你的学生布置作业并通过链接或二维码发送给已经注册并加入你的班级的学生。（请记得在给学生发送作业之前先创建你的班级并让学生注册加入）</li>
                          <li>作业：这里有你给你的所有班级布置的所有作业。点击作业的标题进入，你可以选择批改、提交和删除。</li>
                          <li>当批改作业时，建议删除学生的错误，并用红色字体改正——但你也可以按自己的习惯批改。(每批改一份作业就能得到5积分)</li>
                          <li>创建一个班级：点击创建班级，标明班级名称并选择年级。将班级名称或二维码分享给学生即可邀请学生加入。（学生需已注册才能加入班级）</li>
                          <li>课程计划：你可以在这里浏览其他老师上传的计划，选择你想要的购买和下载。</li>
                          <li>你的课程计划：这里是你已经上传的所有课程计划。目前最多允许上传5个计划，可以删除旧计划和上传新计划。</li>
                          <li>创建课程计划：创建一个课程计划，添加标题和描述，选择年级和科目。可以添加教师笔记或课件以便讲授，设置一个价格。(可以通过分享优秀计划来获得奖金)</li>
                          <li>学术英语：这里的问题主要是关于英语和学术英语写作。你可以选择并接受你想要回答的问题。请注意时间限制，学术英语写作反馈（专业英语、大学英语考试、雅思和托福），时间限制为12个小时，阅读校对和PS（Personal statement招生或陈述论文 个人陈述）时间限制为24个小时。</li>
                          <li>个人陈述论文付费25元-600元 阅读校对的收费标准是0.25元/单词  编辑的收费标准是0.4元/单词</li>
                          <li>邀请链接：通过邀请链接和邀请码邀请同学和教师可以获得额外的积分。如果有学生通过你分享的邀请码注册，你将获得50积分，如果有教师通过你分享的邀请码注册，你将获得100积分。</li>
                        </ul>
                        
                      </p>
                    </p>
                  )}
              </Box>) }
        </Container>
      </>
    )
  }
  
  export default withStyles(styles, { withTheme: true })(HelpGuide);
  
