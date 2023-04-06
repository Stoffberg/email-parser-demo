export const TEST_SET_1 = [
  `
From: John Doe <john.doe@example.com>
Date: Mon, 9 Jul 2023 19:12:28 -0400
To: Jane Smith <jane.smith@example.org>
CC: Joe Bloggs <joe.bloggs@example.net>
Subject: Meeting Tomorrow
Message-ID: <SNT124-W841AE084F66FD2255A6D287D20@example.com>

Hello Jane and Joe,

Just a quick reminder about our meeting tomorrow at 10 AM.

Best regards,
John
  `,
  `
From: Jane Smith <jane.smith@example.org>
Date: Mon, 9 Jul 2023 19:45:36 -0400
To: John Doe <john.doe@example.com>
Subject: Re: Meeting Tomorrow
Message-ID: <SNT125-W481AE084F66FD2255A6D287D21@example.org>
In-Reply-To: <SNT124-W841AE084F66FD2255A6D287D20@example.com>
References: <SNT124-W841AE084F66FD2255A6D287D20@example.com>

Hi John,

Thanks for the reminder. I'll be there.

Best,
Jane
  `,
  `
From: Joe Bloggs <joe.bloggs@example.net>
Date: Mon, 9 Jul 2023 20:05:45 -0400
To: John Doe <john.doe@example.com>, Jane Smith <jane.smith@example.org>
Subject: Re: Meeting Tomorrow
Message-ID: <SNT126-W221AE084F66FD2255A6D287D22@example.net>
In-Reply-To: <SNT124-W841AE084F66FD2255A6D287D20@example.com>
References: <SNT124-W841AE084F66FD2255A6D287D20@example.com>

Hey John and Jane,

I'll be there as well. Looking forward to it.

Cheers,
Joe
  `,
  `
From: Jane Smith <jane.smith@example.org>
Date: Tue, 10 Jul 2023 09:30:22 -0400
To: John Doe <john.doe@example.com>, Joe Bloggs <joe.bloggs@example.net>
Subject: Re: Meeting Tomorrow - Room Change
Message-ID: <SNT127-W987AE084F66FD2255A6D287D23@example.org>

Hi John and Joe,

Just a heads up, the meeting room has been changed to Room 202.

Best,
Jane
  `,
  `
From: John Doe <john.doe@example.com>
Date: Tue, 10 Jul 2023 09:32:10 -0400
To: Jane Smith <jane.smith@example.org>, Joe Bloggs <joe.bloggs@example.net>
Subject: Re: Meeting Tomorrow - Room Change
Message-ID: <SNT128-W654AE084F66FD2255A6D287D24@example.com>
In-Reply-To: <SNT127-W987AE084F66FD2255A6D287D23@example.org>
References: <SNT124-W841AE084F66FD2255A6D287D20@example.com> <SNT127-W987AE084F66FD2255A6D287D23@example.org>

Thanks for the update, Jane! See you in Room 202.

John
  `,
  `
From: Joe Bloggs <joe.bloggs@example.net>
Date: Tue, 10 Jul 2023 09:35:28 -0400
To: Jane Smith <jane.smith@example.org>, John Doe <john.doe@example.com>
Subject: Re: Meeting Tomorrow - Room Change
Message-ID: <SNT129-W333AE084F66FD2255A6D287D25@example.net>
In-Reply-To: <SNT127-W987AE084F66FD2255A6D287D23@example.org>
References: <SNT124-W841AE084F66FD2255A6D287D20@example.com> <SNT127-W987AE084F66FD2255A6D287D23@example.org>

Thanks for letting us know, Jane. I'll be in Room 202.

Joe
  `,
  `
From: Jane Smith <jane.smith@example.org>
Date: Tue, 10 Jul 2023 11:45:55 -0400
To: John Doe <john.doe@example.com>, Joe Bloggs <joe.bloggs@example.net>
Subject: Re: Meeting Summary
Message-ID: <SNT130-W987AE084F66FD2255A6D287D26@example.org>

Hello John and Joe,

Great meeting today! Here's a summary of what we discussed:
1. Project timeline update
2. Budget allocation
3. Team responsibilities

Please let me know if you have any questions.

Best,
Jane
  `,
];

export const TEST_SET_2 = [
  `
From: Lisa Brown <lisa.brown@example.com>
Date: Fri, 14 Apr 2023 08:22:16 -0400
To: Jack Smith <jack.smith@example.org>
CC: Rachel Green <rachel.green@example.net>
Subject: Follow-Up Meeting
Message-ID: <SNT001-W001AE084F66FD2255A6D287D01@example.com>

Hello Jack and Rachel,

I hope this email finds you well. I wanted to schedule a follow-up meeting to discuss the action items from our last meeting. Would next Thursday at 2 PM work for both of you? If not, please let me know your availability.

Best regards,
Lisa
    `,
  `
From: Rachel Green <rachel.green@example.net>
Date: Wed, 19 Apr 2023 11:03:52 -0400
To: Lisa Brown <lisa.brown@example.com>, Jack Smith <jack.smith@example.org>
Subject: RE: Follow-Up Meeting
Message-ID: <SNT002-W002AE084F66FD2255A6D287D02@example.net>
In-Reply-To: <SNT001-W001AE084F66FD2255A6D287D01@example.com>
References: <SNT001-W001AE084F66FD2255A6D287D01@example.com>

Hi Lisa and Jack,

Thank you for scheduling the follow-up meeting. Unfortunately, I won't be able to make it on Thursday at 2 PM. Can we reschedule for Friday at 10 AM instead?

Let me know if that works for you both.

Best,
Rachel
    `,
  `
From: Jack Smith <jack.smith@example.org>
Date: Thu, 20 Apr 2023 14:16:35 -0400
To: Lisa Brown <lisa.brown@example.com>, Rachel Green <rachel.green@example.net>
Subject: RE: Follow-Up Meeting
Message-ID: <SNT003-W003AE084F66FD2255A6D287D03@example.org>
In-Reply-To: <SNT002-W002AE084F66FD2255A6D287D02@example.net>
References: <SNT001-W001AE084F66FD2255A6D287D01@example.com> <SNT002-W002AE084F66FD2255A6D287D02@example.net>

Hi Lisa and Rachel,

Friday at 10 AM works for me. Thank you both for your flexibility.

Best regards,
Jack
    `,
  `
From: Sarah Lee <sarah.lee@example.com>
Date: Tue, 25 Apr 2023 15:08:42 -0400
To: Lisa Brown <lisa.brown@example.com>, Jack Smith <jack.smith@example.org>, Rachel Green <rachel.green@example.net>
Subject: Agenda for Meeting
Message-ID: <SNT004-W004AE084F66FD2255A6D287D04@example.com>

Hello Lisa, Jack, and Rachel,

I hope you all are doing well. Attached you will find the agenda for our upcoming meeting on Friday at 10 AM. Please let me know if you have any questions or if there are any additional items that you would like to discuss.

Best regards,
Sarah
    `,
  `
From: Lisa Brown <lisa.brown@example.com>
Date: Fri, 28 Apr 2023 10:02:15 -0400
To: Sarah Lee <sarah.lee@example.com>, Jack Smith <jack.smith@example.org>, Rachel Green <rachel.green@example.net>
Subject: RE: Agenda for Meeting
Message-ID: <SNT005-W005AE084F66FD2255A6D287D05@example.com>
In-Reply-To: <SNT004-W004AE084F66FD2255A6D287D04@example.com>
References: <SNT004-W004AE084F66FD2255A6D287D04@example.com>

Hi Sarah, Jack, and Rachel,

Thank you for sharing the agenda for the meeting. Everything looks good to me. I also wanted to add a discussion item regarding budget allocation for the upcoming project. Please let me know if that can be added to the agenda.

Looking forward to the meeting!

Best regards,
Lisa
    `,
  `
From: Rachel Green <rachel.green@example.net>
Date: Mon, 1 May 2023 13:45:30 -0400
To: Lisa Brown <lisa.brown@example.com>, Jack Smith <jack.smith@example.org>, Sarah Lee <sarah.lee@example.com>
Subject: Meeting Summary
Message-ID: <SNT006-W006AE084F66FD2255A6D287D06@example.net>

Hello Lisa, Jack, and Sarah,

Thank you for a productive meeting on Friday. I have summarized our discussion points below:
- Project timeline update
- Budget allocation
- Team responsibilities
- Update on marketing strategy

Please let me know if I missed anything or if you have any further questions.

Best regards,
Rachel
    `,
  `
From: Jack Smith <jack.smith@example.org>
Date: Wed, 3 May 2023 09:22:45 -0400
To: Lisa Brown <lisa.brown@example.com>, Rachel Green <rachel.green@example.net>, Sarah Lee <sarah.lee@example.com>
Subject: RE: Meeting Summary
Message-ID: <SNT007-W007AE084F66FD2255A6D287D07@example.org>
In-Reply-To: <SNT006-W006AE084F66FD2255A6D287D06@example.net>
References: <SNT004-W004AE084F66FD2255A6D287D04@example.com> <SNT006-W006AE084F66FD2255A6D287D06@example.net>

Hi Rachel, Lisa, and Sarah,

Thank you for summarizing the meeting. I have one more action item to add to the list. Can we schedule a follow-up meeting to discuss the progress of the project? 

Best regards,
Jack
    `,
];
