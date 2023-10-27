import {Box, Link, Stack, Typography} from "@mui/material";
import PrivacyContactLink from "../privacyContactLink/privacyContactLink.jsx";
import React from "react";
import './privacyContent.css';
export default function PrivacyContent() {
    return (
        <Box component="section" sx={{my: 4}}>
            <Typography variant="h3" gutterBottom textTransform="uppercase">Table Of Contents</Typography>
            <Box>
                <ol style={{paddingLeft: '1.5rem'}}>
                    <li><Link href="#1" underline="hover" variant="body1" color="inherit">WHAT INFORMATION DO WE COLLECT?</Link></li>
                    <li><Link href="#2" underline="hover" variant="body1" color="inherit">HOW DO WE PROCESS YOUR INFORMATION?</Link></li>
                    <li><Link href="#3" underline="hover" variant="body1" color="inherit">WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL
                        INFORMATION?</Link></li>
                    <li><Link href="#4" underline="hover" variant="body1" color="inherit">HOW DO WE HANDLE YOUR SOCIAL LOGINS?</Link></li>
                    <li><Link href="#5" underline="hover" variant="body1" color="inherit">HOW LONG DO WE KEEP YOUR INFORMATION?</Link></li>
                    <li><Link href="#6" underline="hover" variant="body1" color="inherit">HOW DO WE KEEP YOUR INFORMATION SAFE?</Link></li>
                    <li><Link href="#7" underline="hover" variant="body1" color="inherit">DO WE COLLECT INFORMATION FROM MINORS?</Link></li>
                    <li><Link href="#8" underline="hover" variant="body1" color="inherit">WHAT ARE YOUR PRIVACY RIGHTS?</Link></li>
                    <li><Link href="#9" underline="hover" variant="body1" color="inherit">CONTROLS FOR DO-NOT-TRACK FEATURES</Link></li>
                    <li><Link href="#10" underline="hover" variant="body1" color="inherit">DO WE MAKE UPDATES TO THIS NOTICE?</Link></li>
                    <li><Link href="#11" underline="hover" variant="body1" color="inherit">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</Link></li>
                    <li><Link href="#12" underline="hover" variant="body1" color="inherit">HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</Link></li>
                </ol>
            </Box>
            <Box id="1" className="box highlight-box">
                <Typography variant="h5" gutterBottom>1. WHAT INFORMATION DO WE COLLECT?</Typography>

                <Stack className="highlight" gap={1}>
                    <Typography variant="strong" component="strong">
                        In Short: We collect personal information that you provide to us.
                    </Typography>
                    <Typography>
                        We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in
                        obtaining information about us or our products and Services, when you participate in activities on the Services, or
                        otherwise when
                        you contact us.
                    </Typography>
                    <Typography>
                        Personal Information Provided by You. The personal information that we collect depends on the context of your
                        interactions with us
                        and the Services, the choices you make, and the products and features you use. The personal information we collect may
                        include the
                        following:
                        email addresses
                        phone numbers
                        names
                        Sensitive Information. We do not process sensitive information.
                    </Typography>
                    <Typography>
                        Social Media Login Data. We may provide you with the option to register with us using your existing social media
                        account details,
                        like your Facebook, Twitter, or other social media account. If you choose to register in this way, we will collect
                        the information
                        described in the section called <Link href="#4" underline="hover" variant="body1" color="inherit">HOW DO WE HANDLE YOUR SOCIAL LOGINS?</Link> below.
                    </Typography>
                    <Typography>
                        All personal information that you provide to us must be true, complete, and accurate, and you must notify us of
                        any changes to such
                        personal information.
                    </Typography>
                </Stack>
            </Box>
            <Box id="2" className="box highlight-box">
                <Typography variant="h5" gutterBottom>2. HOW DO WE PROCESS YOUR INFORMATION?</Typography>

                <Stack className="highlight" gap={1}>
                    <Typography variant="strong" component="strong">
                        In Short: We process your information to provide, improve, and administer our Services, communicate with you, for security and
                        fraud
                        prevention, and to comply with law. We may also process your information for other purposes with your consent.
                    </Typography>
                    <Typography>
                        We process your personal information for a variety of reasons, depending on how you interact with our Services, including:
                        To facilitate account creation and authentication and otherwise manage user accounts. We may process your information so you can
                        create and log in to your account, as well as keep your account in working order.
                        To send administrative information to you. We may process your information to send you details about our products and services,
                        changes to our terms and policies, and other similar information.

                    </Typography>
                </Stack>
            </Box>
            <Box id="3" className="box highlight-box">
                <Typography variant="h5" gutterBottom>3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</Typography>

                <Stack className="highlight" gap={1}>
                    <Typography variant="strong" component="strong">
                        In Short: We may share information in specific situations described in this section and/or with the following third parties.
                    </Typography>
                    <Typography>
                        We may need to share your personal information in the following situations:
                        Business Transfers. We may share or transfer your information in connection with, or during negotiations of, any merger, sale of
                        company assets, financing, or acquisition of all or a portion of our business to another company.

                    </Typography>
                </Stack>
            </Box>
            <Box id="4" className="box highlight-box">
                <Typography variant="h5" gutterBottom>4. HOW DO WE HANDLE YOUR SOCIAL LOGINS?</Typography>

                <Stack className="highlight" gap={1}>
                    <Typography variant="strong" component="strong">
                        In Short: If you choose to register or log in to our Services using a social media account, we may have access to certain
                        information about you.
                    </Typography>
                    <Typography>
                        Our Services offer you the ability to register and log in using your third-party social media account details (like your
                        Facebook or
                        Twitter logins). Where you choose to do this, we will receive certain profile information about you from your social media
                        provider.
                        The profile information we receive may vary depending on the social media provider concerned, but will often include your name,
                        email address, friends list, and profile picture, as well as other information you choose to make public on such a social media
                        platform.
                    </Typography>
                    <Typography>
                        We will use the information we receive only for the purposes that are described in this privacy notice or that are otherwise
                        made
                        clear to you on the relevant Services. Please note that we do not control, and are not responsible for, other uses of your
                        personal
                        information by your third-party social media provider. We recommend that you review their privacy notice to understand how
                        they
                        collect, use, and share your personal information, and how you can set your privacy preferences on their sites and apps.
                    </Typography>
                </Stack>
            </Box>
            <Box id="5" className="box highlight-box">
                <Typography variant="h5" gutterBottom>5. HOW LONG DO WE KEEP YOUR INFORMATION?</Typography>

                <Stack className="highlight" gap={1}>
                    <Typography variant="strong" component="strong">
                        In Short: We keep your information for as long as necessary to fulfill the purposes outlined in this privacy notice unless
                        otherwise
                        required by law.
                    </Typography>
                    <Typography>
                        We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice,
                        unless a
                        longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements). No purpose in
                        this
                        notice will require us keeping your personal information for longer than the period of time in which users have an account with
                        us.
                    </Typography>
                    <Typography>
                        When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize
                        such
                        information, or, if this is not possible (for example, because your personal information has been stored in backup
                        archives), then
                        we will securely store your personal information and isolate it from any further processing until deletion is possible.
                    </Typography>
                </Stack>
            </Box>
            <Box id="6" className="box highlight-box">
                <Typography variant="h5" gutterBottom>6. HOW DO WE KEEP YOUR INFORMATION SAFE?</Typography>

                <Stack className="highlight" gap={1}>
                    <Typography variant="strong" component="strong">
                        In Short: We aim to protect your personal information through a system of organizational and technical security measures.
                    </Typography>
                    <Typography>
                        We have implemented appropriate and reasonable technical and organizational security measures designed to protect the security
                        of
                        any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic
                        transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or
                        guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and
                        improperly
                        collect, access, steal, or modify your information. Although we will do our best to protect your personal information,
                        transmission
                        of personal information to and from our Services is at your own risk. You should only access the Services within a secure
                        environment.

                    </Typography>
                </Stack>
            </Box>
            <Box id="7" className="box highlight-box">
                <Typography variant="h5" gutterBottom>7. DO WE COLLECT INFORMATION FROM MINORS?</Typography>

                <Stack className="highlight" gap={1}>
                    <Typography variant="strong" component="strong">
                        In Short: We do not knowingly collect data from or market to children under 18 years of age.
                    </Typography>
                    <Typography>
                        We do not knowingly solicit data from or market to children under 18 years of age. By using the Services, you represent that you
                        are
                        at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent’s use of the Services. If
                        we
                        learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take
                        reasonable measures to promptly delete such data from our records. If you become aware of any data we may have collected from
                        children under age 18, please contact us at <PrivacyContactLink/>.
                    </Typography>
                </Stack>
            </Box>
            <Box id="8" className="box highlight-box">
                <Typography variant="h5" gutterBottom>8. WHAT ARE YOUR PRIVACY RIGHTS?</Typography>

                <Stack className="highlight" gap={1}>
                    <Typography variant="strong" component="strong">
                        In Short: You may review, change, or terminate your account at any time.
                    </Typography>
                    <Typography>
                        Withdrawing your consent: If we are relying on your consent to process your personal information, which may be express and/or
                        implied consent depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw your
                        consent at any time by contacting us by using the contact details provided in the section <Link href="#11" underline="hover" variant="body1" color="inherit">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</Link> below.
                    </Typography>
                    <Typography>
                        However, please note that this will not affect the lawfulness of the processing before its withdrawal nor, when applicable
                        law
                        allows, will it affect the processing of your personal information conducted in reliance on lawful processing grounds other
                        than
                        consent.
                    </Typography>
                    <Typography variant="h4">
                        Account Information
                    </Typography>
                    <Typography>
                        If you would at any time like to review or change the information in your account or terminate your account, you
                        can:
                        Remove your account via Goggle's app permissions management.
                        Upon your request to terminate your account, we will deactivate or delete your account and information from our
                        active databases.
                        However, we may retain some information in our files to prevent fraud, troubleshoot problems, assist with any
                        investigations,
                        enforce our legal terms and/or comply with applicable legal requirements.
                    </Typography>
                    <Typography>
                        If you have questions or comments about your privacy rights, you may email us at <PrivacyContactLink/>.
                    </Typography>
                </Stack>
            </Box>
            <Box id="9" className="box highlight-box">
                <Typography variant="h5" gutterBottom>9. CONTROLS FOR DO-NOT-TRACK FEATURES</Typography>

                <Stack className="highlight" gap={1}>
                    <Typography>
                        Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature or setting
                        you
                        can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected.
                        At
                        this stage no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not
                        currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked
                        online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice
                        in a
                        revised version of this privacy notice.
                    </Typography>
                </Stack>
            </Box>
            <Box id="10" className="box highlight-box">
                <Typography variant="h5" gutterBottom>10. DO WE MAKE UPDATES TO THIS NOTICE?</Typography>
                <Stack className="highlight" gap={1}>
                    <Typography variant="strong" component="strong">
                        In Short: Yes, we will update this notice as necessary to stay compliant with relevant laws.
                    </Typography>
                    <Typography>
                        We may update this privacy notice from time to time. The updated version will be indicated by an updated "Revised" date and the
                        updated version will be effective as soon as it is accessible. If we make material changes to this privacy notice, we may notify
                        you
                        either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review
                        this
                        privacy notice frequently to be informed of how we are protecting your information.
                    </Typography>
                </Stack>
            </Box>
            <Box id="11" className="box highlight-box">
                <Typography variant="h5" gutterBottom>11. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</Typography>
                <Typography className="highlight">
                    If you have questions or comments about this notice, you may email us at <PrivacyContactLink/>.
                    {/*
                            or contact us by post at:
                            Shabtsak
                            __________
                            __________
                            Israel
                            */}
                </Typography>
            </Box>
            <Box id="12" className="box highlight-box">
                <Typography variant="h5" gutterBottom>12. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</Typography>
                <Typography className="highlight">
                    Based on the applicable laws of your country, you may have the right to request access to the personal
                    information we collect from you, change that information, or delete it. To request to review, update, or delete your personal
                    information, please fill out
                    and submit a data subject access request.
                </Typography>
            </Box>
        </Box>
    )
}