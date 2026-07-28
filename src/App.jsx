import React, { useState } from "react";

// ─── LEVEL COLOURS ────────────────────────────────────────────────────────────

const LC = {
  Skilled:        { bg: "#1e7e4a", light: "#ef5ee", border: "#a8d5b8" },
  Accomplished:   { bg: "#c0392b", light: "#fdecea", border: "#f0b0aa" },
  "Leading Edge": { bg: "#6c3483", light: "#f3eef9", border: "#c9a8e0" },
};

const LEVELS = ["Skilled", "Accomplished", "Leading Edge"];

// ─── GRADES ───────────────────────────────────────────────────────────────────

const GRADES = {
  S1: { titles: "Assistant, Intern",                 mix: ["Skilled","Skilled","Skilled","Skilled","Skilled","Skilled"] },
  S2: { titles: "Assistant, Intern",                 mix: ["Skilled","Skilled","Skilled","Skilled","Skilled","Skilled"] },
  S3: { titles: "Coordinator",                       mix: ["Skilled","Skilled","Skilled","Skilled","Skilled","Skilled"] },
  P1: { titles: "Officer",                           mix: ["Skilled","Skilled","Skilled","Skilled","Skilled","Skilled"] },
  P2: { titles: "Senior Officer",                    mix: ["Skilled","Skilled","Skilled","Skilled","Skilled","Skilled"] },
  P3: { titles: "Specialist, Advisor",               mix: ["Skilled","Skilled","Skilled","Skilled","Accomplished","Accomplished"] },
  M1: { titles: "Team Lead",                         mix: ["Skilled","Skilled","Skilled","Skilled","Accomplished","Accomplished"] },
  P4: { titles: "Senior Specialist, Senior Advisor", mix: ["Skilled","Skilled","Skilled","Accomplished","Accomplished","Accomplished"] },
  M2: { titles: "Manager",                           mix: ["Skilled","Skilled","Skilled","Accomplished","Accomplished","Accomplished"] },
  P5: { titles: "Lead",                              mix: ["Accomplished","Accomplished","Accomplished","Accomplished","Skilled","Skilled"] },
  M3: { titles: "Senior Manager",                    mix: ["Accomplished","Accomplished","Accomplished","Accomplished","Skilled","Skilled"] },
  P6: { titles: "Senior Lead, Head",                 mix: ["Accomplished","Accomplished","Accomplished","Accomplished","Leading Edge","Leading Edge"] },
  M4: { titles: "Head",                              mix: ["Accomplished","Accomplished","Accomplished","Accomplished","Leading Edge","Leading Edge"] },
  P7: { titles: "Director",                          mix: ["Leading Edge","Leading Edge","Leading Edge","Leading Edge","Leading Edge","Leading Edge"] },
  M5: { titles: "Director",                          mix: ["Leading Edge","Leading Edge","Leading Edge","Leading Edge","Leading Edge","Leading Edge"] },
  M6: { titles: "Senior Director",                   mix: ["Leading Edge","Leading Edge","Leading Edge","Leading Edge","Leading Edge","Leading Edge"] },
  E1: { titles: "Chief Officer (CxO)",               mix: ["Leading Edge","Leading Edge","Leading Edge","Leading Edge","Leading Edge","Leading Edge"] },
};

function levelCounts(gradeKey) {
  const g = GRADES[gradeKey?.toUpperCase()];
  if (!g) return {};
  const c = {};
  g.mix.forEach(l => { c[l] = (c[l] || 0) + 1; });
  return c;
}

function uniqueLevels(gradeKey) {
  const g = GRADES[gradeKey?.toUpperCase()];
  if (!g) return LEVELS;
  return [...new Set(g.mix)];
}

// ─── TITLE INFERENCE ─────────────────────────────────────────────────────────

function inferFromTitle(title) {
  if (!title) return null;
  const t = title.toLowerCase();
  if (/\bchief\b|\bcxo\b|\bceo\b|\bcoo\b|\bcfo\b|\bchro\b/.test(t)) return { grade: "E1", label: "E1 / M6", description: "Chief Officer / Senior Director" };
  if (/\bsenior director\b/.test(t))                                  return { grade: "M6", label: "M6",      description: "Senior Director" };
  if (/\bdirector\b/.test(t))                                         return { grade: "P7", label: "P7 / M5", description: "Director" };
  if (/\bsenior lead\b|\bhead of\b|\bhead\b/.test(t))                 return { grade: "P6", label: "P6 / M4", description: "Senior Lead / Head" };
  if (/\bsenior manager\b/.test(t))                                   return { grade: "M3", label: "M3 / P5", description: "Senior Manager / Lead" };
  if (/\blead\b/.test(t))                                             return { grade: "P5", label: "P5 / M3", description: "Lead / Senior Manager" };
  if (/\bsenior advisor\b|\bsenior specialist\b|\bmanager\b/.test(t)) return { grade: "P4", label: "P4 / M2", description: "Senior Advisor / Manager" };
  if (/\badvisor\b|\bspecialist\b/.test(t))                           return { grade: "P3", label: "P3 / M1", description: "Advisor / Specialist" };
  if (/\bsenior officer\b/.test(t))                                   return { grade: "P2", label: "P2",      description: "Senior Officer" };
  if (/\bofficer\b/.test(t))                                          return { grade: "P1", label: "P1",      description: "Officer" };
  if (/\bcoordinator\b/.test(t))                                      return { grade: "S3", label: "S3",      description: "Coordinator" };
  if (/\bassistant\b|\bintern\b/.test(t))                             return { grade: "S1", label: "S1 / S2", description: "Assistant / Intern" };
  return null;
}

// ─── FRAMEWORK ────────────────────────────────────────────────────────────────

const FRAMEWORK = [
  {
    key: "LEADING", label: "Leading", color: "#6c3483",
    competencies: [
      {
        id: "leading_inspiring", name: "Leading and inspiring others",
        indicators: {
          Skilled: [
            "Demonstrates clear commitment to the organisation's vision and values in all aspects of work",
            "Presents a positive 'can do' attitude",
            "Challenges themselves to work to the best of their ability and supports colleagues to do the same",
            "Demonstrates personal integrity by using their position responsibly and fairly",
          ],
          Accomplished: [
            "Communicates our vision, values and strategy effectively and encourages others to share them",
            "Influences others positively to achieve team goals",
            "Recognises and celebrates the contribution and success of individuals and the team",
            "Takes a flexible and positive leadership style, adapting to a given situation or to the needs of the team",
            "Demonstrates humility in leadership of others",
          ],
          "Leading Edge": [
            "Creates and engages others in a shared vision and strategy that will deliver more for children",
            "Acts with integrity, including walking away from major opportunities if these are not aligned to the organisation's values",
            "Inspires people to reach the highest standards of performance and to feel a sense of pride in belonging to the organisation",
          ],
        },
        questions: {
          Skilled: [
            { type: "Opening",     q: "Tell us about a time you took the lead on a specific task or project. What was the goal, and how did you approach it?" },
            { type: "Situational", q: "If you were working on a team project and noticed morale was low because of a setback, what steps would you take to bring a 'can-do' attitude to the group?" },
            { type: "Evidence",    q: "Give an example of a time you had to deliver high-quality work under pressure. How did you ensure you maintained your standards?" },
            { type: "Challenge",   q: "Describe a situation where you had to take ownership of a task that no one else wanted to do. How did you ensure it was completed successfully?" },
          ],
          Accomplished: [
            { type: "Opening",     q: "How do you translate high-level organisational goals into a vision that is meaningful and motivating for your team?" },
            { type: "Situational", q: "You are leading a team through a period of significant change where some members are resistant. How would you gain their buy-in and keep them focused?" },
            { type: "Evidence",    q: "Describe a time you successfully influenced a senior stakeholder or another team to support your goals. What specific approach did you take?" },
            { type: "Challenge",   q: "Tell us about a time you had to make a difficult leadership decision that you knew would be unpopular. How did you handle the communication and the aftermath?" },
          ],
          "Leading Edge": [
            { type: "Opening",     q: "How do you go about creating and engaging others in a long-term strategic vision for an entire department or organisation?" },
            { type: "Situational", q: "Imagine a high-value opportunity arises that contradicts the organisation's core values. Walk us through how you would navigate this leadership dilemma." },
            { type: "Evidence",    q: "Share an example of how you have inspired a large, diverse group of people to achieve a standard of performance they didn't think was possible." },
            { type: "Challenge",   q: "Describe a situation where you had to lead a major transformation across different geographies or functions. What was the most significant hurdle and how did you overcome it?" },
          ],
        },
      },
      {
        id: "delivering_results", name: "Delivering results",
        indicators: {
          Skilled: [
            "Delivers timely and appropriate results using available resources",
            "Takes responsibility for their work and its impact on others",
            "Plans, prioritises and performs tasks well without needing direct supervision",
            "Understands the link between their work and the organisation's objectives",
          ],
          Accomplished: [
            "Maintains both a broad strategic perspective and an awareness of the detail of a situation",
            "Establishes clear and compelling objectives with teams and individuals and monitors progress and performance",
            "Creates and applies measures and metrics to track performance",
            "Holds others accountable for achieving results and challenges underperformance",
            "Demonstrates financial awareness and a concern for cost effectiveness",
          ],
          "Leading Edge": [
            "Aligns ideas and solutions to strategic imperatives to support delivery of long-term strategic objectives",
            "Helps others to navigate the organisation and assists them in developing and delivering on their strategic plans",
            "Pursues opportunities, managing risks and uncertainty, to enable the organisation to deliver more impact",
            "Builds a culture of quality and focuses on ongoing performance improvement",
            "Provides resources and removes obstacles to support cross-organisational and/or geographically dispersed teams",
          ],
        },
        questions: {
          Skilled: [
            { type: "Opening",     q: "Talk us through how you manage your daily workload. How do you decide what to prioritise?" },
            { type: "Situational", q: "You have been assigned a task but realise halfway through that you don't have all the resources you need. How do you ensure the result is still delivered on time?" },
            { type: "Evidence",    q: "Give an example of a time you delivered a project or task without direct supervision. How did you monitor your own progress?" },
            { type: "Challenge",   q: "Tell us about a time you identified a way to make a piece of work more cost-effective or efficient. What was the outcome?" },
          ],
          Accomplished: [
            { type: "Opening",     q: "How do you balance the need for high-level strategic oversight with the need to manage the practical details of a project?" },
            { type: "Situational", q: "A key member of your project team is consistently underperforming, risking a critical deadline. How do you address this while keeping the project on track?" },
            { type: "Evidence",    q: "Describe a time you used specific metrics or data to track performance. How did this information help you achieve the final result?" },
            { type: "Challenge",   q: "Tell us about a complex project you managed where you had to hold multiple stakeholders accountable for results they weren't delivering." },
          ],
          "Leading Edge": [
            { type: "Opening",     q: "How do you ensure that your team's strategic plans are directly aligned with the organisation's long-term imperatives?" },
            { type: "Situational", q: "You are pursuing a high-risk strategic opportunity with a high degree of uncertainty. How do you manage the risks while maintaining a focus on delivery?" },
            { type: "Evidence",    q: "Describe how you have built a culture of continuous quality improvement within your area of responsibility. What measurable impact has this had?" },
            { type: "Challenge",   q: "Tell us about a time you had to provide resources or remove significant obstacles for a geographically dispersed team to ensure a global goal was met." },
          ],
        },
      },
      {
        id: "developing_others", name: "Developing self and others",
        indicators: {
          Skilled: [
            "Shows awareness of their strengths and limitations and actively takes responsibility for their own development",
            "Seeks out feedback to understand areas most in need of improvement",
            "Actively shares knowledge and experience with others",
          ],
          Accomplished: [
            "Gives regular positive and constructive feedback to others",
            "Identifies clear development needs and development plans through regular constructive reviews of their own performance",
            "Creates space for others to learn and provides challenging and stretching tasks and assignments when people are ready for them",
            "Coaches others to learn from their experiences on the job and to use the resources available to them",
          ],
          "Leading Edge": [
            "Creates and enables a learning culture that supports the development of staff",
            "Takes responsibility for helping to build organisational capabilities to meet current and future challenges",
            "Ensures that development opportunities, resources and time are equally available to all",
          ],
        },
        questions: {
          Skilled: [
            { type: "Opening",     q: "How do you stay aware of your own strengths and areas for development?" },
            { type: "Situational", q: "You receive constructive feedback that you disagree with. How would you handle that conversation and what would you do with the feedback?" },
            { type: "Evidence",    q: "Give an example of when you shared your knowledge or experience to help a colleague improve. How did it help them?" },
            { type: "Challenge",   q: "Tell us about a time you identified a gap in your own skills and took proactive steps to close it. What was the impact on your work?" },
          ],
          Accomplished: [
            { type: "Opening",     q: "How do you go about identifying the development needs of the individuals in your team?" },
            { type: "Situational", q: "A team member is ready for a promotion but there are no current vacancies. How do you keep them challenged and engaged in their development?" },
            { type: "Evidence",    q: "Describe a time you coached someone to solve a problem themselves rather than giving them the answer. What was the result?" },
            { type: "Challenge",   q: "Tell us about a time you had to deliver very difficult performance feedback. How did you prepare, and what was the long-term outcome for the individual?" },
          ],
          "Leading Edge": [
            { type: "Opening",     q: "What strategies have you used to create a genuine learning culture across an entire organisation?" },
            { type: "Situational", q: "You notice that certain groups within the organisation have less access to development opportunities than others. What steps would you take to fix this?" },
            { type: "Evidence",    q: "Share an example of how you have built organisational capability to meet a specific future challenge." },
            { type: "Challenge",   q: "Describe your approach to succession planning for senior leadership roles. How do you ensure it is fair, transparent, and effective?" },
          ],
        },
      },
    ],
  },
  {
    key: "THINKING", label: "Thinking", color: "#c0392b",
    competencies: [
      {
        id: "problem_solving", name: "Problem solving and decision making",
        indicators: {
          Skilled: [
            "Gathers the right information and uses critical thinking to make effective and timely decisions",
            "Stays with a problem or challenge until a solution is reached or is no longer reasonably attainable",
            "Knows when to involve others in a decision",
            "Demonstrates awareness of the wider external influences that impact on decision making",
            "Simplifies processes and procedures wherever possible",
          ],
          Accomplished: [
            "Uses data and evidence to drive decision making for quality improvement",
            "Analyses and exercises judgment in challenging situations where specific guidance or the full facts are not available",
            "Makes informed strategic decisions based on full evaluation of the opportunities and risks of each idea and solution",
            "Takes decisions when needed and is prepared to account for them",
          ],
          "Leading Edge": [
            "Identifies and addresses root causes of long-term problems facing the organisation",
            "Brings in external perspective to ensure strategic decision making remains relevant and focused on the long term",
            "Provides a strategic framework to support decision making across the organisation",
            "Explores and analyses external trends and their potential impact on strategic choices",
            "Takes calculated risks and has the courage to stand by those decisions, when appropriate, despite resistance",
          ],
        },
        questions: {
          Skilled: [
            { type: "Opening",     q: "Tell us about a problem you recently solved. How did you gather the information you needed to make a decision?" },
            { type: "Situational", q: "You are faced with two urgent tasks but only have time for one. How do you decide which one to prioritise?" },
            { type: "Evidence",    q: "Give an example of a time you stayed with a difficult problem until it was resolved. What obstacles did you face?" },
            { type: "Challenge",   q: "Describe a time you had to make a decision without having all the information you wanted. How did you manage the risk of getting it wrong?" },
          ],
          Accomplished: [
            { type: "Opening",     q: "How do you use data and evidence to drive improvements in how your team makes decisions?" },
            { type: "Situational", q: "You are in a high-pressure situation where there is no clear guidance or policy to follow. How do you decide on the best course of action?" },
            { type: "Evidence",    q: "Tell us about a strategic decision you made where you had to carefully weigh up significant risks against potential opportunities." },
            { type: "Challenge",   q: "Describe a time you took a decision that resulted in a negative outcome. How did you take accountability for it and what did you do next?" },
          ],
          "Leading Edge": [
            { type: "Opening",     q: "How do you identify the root causes of long-term, systemic problems within an organisation rather than just treating the symptoms?" },
            { type: "Situational", q: "Outside trends are shifting in a way that threatens your current strategy. How do you adapt your decision-making framework?" },
            { type: "Evidence",    q: "Describe a strategic framework you have developed to help others across the organisation make consistent, high-quality decisions." },
            { type: "Challenge",   q: "Tell us about a time you took a high-stakes calculated risk that faced strong internal resistance. How did you navigate that resistance to deliver the solution?" },
          ],
        },
      },
      {
        id: "innovating", name: "Innovating and adapting",
        indicators: {
          Skilled: [
            "Suggests creative improvements and better ways of working",
            "Seeks out and applies successful ideas from others to overcome challenges",
            "Shifts tasks, roles and priorities to perform effectively under changing or unclear conditions",
            "Applies lessons learned to enhance future ways of working",
          ],
          Accomplished: [
            "Openly talks about doing things differently, pushing boundaries and ways of working to drive improvements",
            "Demonstrates flexibility in following processes and procedures, while remaining true to the organisation's values",
            "Anticipates change and adapts their (and their team's) plans and priorities accordingly",
            "Builds others' confidence in their own ability to develop new ideas and embrace change",
            "Generates learning for the organisation and evidence of the impact and quality of our work",
          ],
          "Leading Edge": [
            "Drives innovation and breakthrough solutions to improve outcomes",
            "Promotes a culture and work environment where people try new ideas, take risks and learn from failures",
            "Sponsors initiatives to ensure that people, processes and technology create an agile organisation",
            "Embeds and scales evidenced-based change to deliver enduring transformation",
            "Brings the best of innovations from partnerships and other sectors into the organisation",
          ],
        },
        questions: {
          Skilled: [
            { type: "Opening",     q: "Tell us about a time you suggested a new or better way of doing something in your team." },
            { type: "Situational", q: "You are mid-way through a task when the priorities suddenly change. How do you respond and ensure you remain effective?" },
            { type: "Evidence",    q: "Give an example of a time you learned a lesson from a mistake and applied it to a future piece of work." },
            { type: "Challenge",   q: "Describe a time you had to work in an environment that was very unclear. How did you manage your own productivity?" },
          ],
          Accomplished: [
            { type: "Opening",     q: "How do you encourage your team to think differently and challenge the status quo?" },
            { type: "Situational", q: "A long-standing internal process is clearly no longer fit for purpose. How do you go about redesigning it while maintaining the organisation's values?" },
            { type: "Evidence",    q: "Tell us about a time you anticipated a change in the environment and adapted your team's plans before the change actually hit." },
            { type: "Challenge",   q: "Describe a time you successfully implemented an innovative solution that required you to push conventional boundaries." },
          ],
          "Leading Edge": [
            { type: "Opening",     q: "How do you drive an innovation pipeline that consistently delivers breakthrough outcomes?" },
            { type: "Situational", q: "How do you create an environment where staff feel safe to take risks and, crucially, to fail and learn from those failures?" },
            { type: "Evidence",    q: "Share an example of a time you scaled a small-scale innovation into an organisation-wide transformation. What was the impact?" },
            { type: "Challenge",   q: "Describe how you have successfully brought an innovation from a partner or another sector and embedded it into the organisation's workflow." },
          ],
        },
      },
      {
        id: "technical_expertise", name: "Applying technical and professional expertise",
        indicators: {
          Skilled: [
            "Delivers work that reflects a good knowledge and application of technical and professional standards",
            "Keeps up to date with trends in their work area",
            "Maintains ethical and professional behaviour in accordance with relevant codes of conduct",
          ],
          Accomplished: [
            "Makes decisions based on professional expertise and experience without deferring unnecessarily to others",
            "Shares knowledge and best practice on technical solutions so that others can make best use of that expertise",
            "Actively seeks new ways to develop the application of technical and professional standards within the team",
          ],
          "Leading Edge": [
            "Sets and drives standards for the organisation to deliver better quality outcomes",
            "Reviews the external environment to lead improvement in standards",
            "Aligns technical and professional standards to support organisational strategy",
            "Coordinates and harnesses professional expertise across the organisation",
          ],
        },
        questions: {
          Skilled: [
            { type: "Opening",     q: "How do you stay up-to-date with the latest trends and standards in your professional area?" },
            { type: "Situational", q: "You are asked to perform a task using a method you know is technically outdated. How would you approach your manager about this?" },
            { type: "Evidence",    q: "Tell us about a piece of work you produced that demonstrated your technical expertise. How did you ensure it met professional standards?" },
            { type: "Challenge",   q: "Describe a time you had to explain a complex technical concept to a non-technical colleague. How did you ensure they understood?" },
          ],
          Accomplished: [
            { type: "Opening",     q: "When do you rely on your own expertise to make a decision, and when do you feel it is necessary to seek a second opinion?" },
            { type: "Situational", q: "You notice a gap in technical standards within your team that is affecting the quality of work. How do you go about fixing it?" },
            { type: "Evidence",    q: "Give an example of how you have shared your technical knowledge to help others improve their own professional standards." },
            { type: "Challenge",   q: "Tell us about a time you had to defend a technical recommendation against a non-technical objection from a senior stakeholder." },
          ],
          "Leading Edge": [
            { type: "Opening",     q: "How do you go about setting and driving the professional standards for an entire organisation?" },
            { type: "Situational", q: "You identify that the organisation's current professional standards are no longer aligned with the global strategy. How do you lead that realignment?" },
            { type: "Evidence",    q: "Describe how you have harnessed professional expertise from across different parts of the organisation to solve a major challenge." },
            { type: "Challenge",   q: "Share an example of how you have influenced the external professional environment to improve standards." },
          ],
        },
      },
    ],
  },
  {
    key: "ENGAGING", label: "Engaging", color: "#1e7e4a",
    competencies: [
      {
        id: "working_with_others", name: "Working effectively with others",
        indicators: {
          Skilled: [
            "Actively listens to new and different perspectives and experiences of those they work with",
            "Proactively supports team members and trusts their capabilities",
            "Demonstrates understanding of their skills and how they complement those of others within diverse teams and groups",
            "Clarifies their role and responsibilities within the team to maximise impact",
          ],
          Accomplished: [
            "Enables people from a wide range of backgrounds and perspectives to contribute to positive outcomes",
            "Breaks down silo working and challenges behaviours that are not collaborative",
            "Knows when to follow and when to lend leadership to strengthen other leaders",
            "Recognises when trust is broken and seeks to resolve conflict and re-establish trust",
          ],
          "Leading Edge": [
            "Offers organisation-wide support and collaboration to leaders working across the whole movement",
            "Opens up hidden areas of organisational disagreement and drives for collaborative resolution",
            "Builds an organisation which reflects the communities in which we work",
            "Creates an environment which promotes diversity and does not tolerate discrimination",
          ],
        },
        questions: {
          Skilled: [
            { type: "Opening",     q: "What does working collaboratively mean to you in your day-to-day role?" },
            { type: "Situational", q: "You are in a team meeting where two people are dominating the conversation and others are being ignored. Do you do anything? If so, what?" },
            { type: "Evidence",    q: "Give an example of a time you proactively supported a colleague who was struggling. How did you approach them?" },
            { type: "Challenge",   q: "Tell us about a time you worked in a very diverse team. How did you ensure your different skills and perspectives complemented each other?" },
          ],
          Accomplished: [
            { type: "Opening",     q: "How do you ensure that everyone in a diverse group — regardless of their background — feels able to contribute to a project?" },
            { type: "Situational", q: "You are leading a project involving two departments that traditionally don't work well together. How do you break down those barriers?" },
            { type: "Evidence",    q: "Describe a time you had to resolve a significant conflict within your team. What was the root cause and how did you re-establish trust?" },
            { type: "Challenge",   q: "Tell us about a time you chose to follow rather than lead because someone else's expertise was more valuable to the goal." },
          ],
          "Leading Edge": [
            { type: "Opening",     q: "How do you build an organisational culture that proactively promotes diversity and has zero tolerance for discrimination?" },
            { type: "Situational", q: "There is a deep, unaddressed disagreement between two senior leadership teams. How do you drive that toward a collaborative resolution?" },
            { type: "Evidence",    q: "Share an example of a large-scale, cross-organisational collaboration you led. What were the measurable results?" },
            { type: "Challenge",   q: "Describe how you move an organisation beyond compliance with diversity policies toward a culture where diversity is seen as a strategic advantage." },
          ],
        },
      },
      {
        id: "communicating", name: "Communicating with impact",
        indicators: {
          Skilled: [
            "Actively listens and seeks to understand before being understood",
            "Ensures communications are concise and well-structured",
            "Shares relevant and timely information with others",
            "Prepares effectively for meetings",
          ],
          Accomplished: [
            "Conveys complex issues with clarity, brevity and confidence",
            "Promotes dialogue with key stakeholders through active listening and effective questioning",
            "Adapts communication style to maximise support and engagement",
            "Advises others on different approaches to influence key stakeholders",
            "Seeks out new methodologies for communication to engage new audiences",
          ],
          "Leading Edge": [
            "Delivers influential advice and briefings to internal and external audiences to build the call for action",
            "Plans and implements multiple strategies for influencing in order to achieve better results",
            "Builds behind-the-scenes support for ideas",
            "Projects confidence and authority to influential audiences, and makes the most of subject matter, even when it's less familiar",
          ],
        },
        questions: {
          Skilled: [
            { type: "Opening",     q: "How do you prepare for an important meeting to ensure your message is clear and heard?" },
            { type: "Situational", q: "You need to explain a complex change to your team, and you know some people will be unhappy. How do you structure your communication?" },
            { type: "Evidence",    q: "Describe a time you had to listen actively to a difficult or emotional colleague before responding. What was the outcome?" },
            { type: "Challenge",   q: "Tell us about a time you had to communicate a clear, concise message under significant time pressure." },
          ],
          Accomplished: [
            { type: "Opening",     q: "How do you adapt your communication style when speaking to different audiences, for example a junior team versus a board of directors?" },
            { type: "Situational", q: "You are trying to influence a key stakeholder who is very busy and uninterested in your project. How do you capture their attention and earn their support?" },
            { type: "Evidence",    q: "Give an example of when you used active listening and effective questioning to uncover the real issue behind a problem." },
            { type: "Challenge",   q: "Describe a time you had to convey a highly complex issue with extreme brevity. How did you decide what to include and what to cut?" },
          ],
          "Leading Edge": [
            { type: "Opening",     q: "How do you plan and implement a multi-layered strategy for influencing different groups to achieve a major result?" },
            { type: "Situational", q: "You are representing the organisation in a high-stakes external briefing on a subject you are only partially familiar with. How do you maintain authority and impact?" },
            { type: "Evidence",    q: "Describe a time you built behind-the-scenes support for a major strategic idea before presenting it formally." },
            { type: "Challenge",   q: "Share an example of a time you delivered a call to action that successfully changed the direction of an external partnership or donor." },
          ],
        },
      },
      {
        id: "networking", name: "Networking",
        indicators: {
          Skilled: [
            "Actively participates in networks to access and contribute to good practice",
            "Gathers and distributes organisational intelligence",
            "Maintains and develops a range of contacts and keeps them informed",
            "Knows what is needed from contacts and what they need to benefit from the relationship too",
          ],
          Accomplished: [
            "Builds trust with contacts through openness and honesty",
            "Participates effectively in sensitive, complex and/or high-impact relationships and networks",
            "Builds strong relationships with a broad range of stakeholders",
            "Spots opportunities to create partnerships and working alliances that have not been considered before",
          ],
          "Leading Edge": [
            "Demonstrates transparency and openness when engaging with others",
            "Drives external networks and partnerships in the sector and beyond",
            "Aligns and builds networks and alliances to reflect global shifts and opportunities",
            "Gathers intelligence from external networks to influence the medium- and longer-term impact of our work",
          ],
        },
        questions: {
          Skilled: [
            { type: "Opening",     q: "How do you go about building and maintaining a network of professional contacts?" },
            { type: "Situational", q: "You attend a sector event where you don't know anyone. What is your strategy for making useful connections?" },
            { type: "Evidence",    q: "Give an example of a time you used information from your network to improve the way you did your job." },
            { type: "Challenge",   q: "Tell us about a time you identified a contact who could help your team, and how you managed that relationship for everyone's benefit." },
          ],
          Accomplished: [
            { type: "Opening",     q: "How do you build trust and social capital within your professional networks?" },
            { type: "Situational", q: "You identify an opportunity for a partnership that has never been considered before. How do you go about pitching this to the potential partner?" },
            { type: "Evidence",    q: "Describe a time you participated in a highly sensitive or high-impact network. How did you balance openness with the need for confidentiality?" },
            { type: "Challenge",   q: "Tell us about a time you turned a transactional relationship into a long-term, high-value strategic alliance." },
          ],
          "Leading Edge": [
            { type: "Opening",     q: "How do you align your personal and organisational networking activities to reflect the major global shifts in your sector?" },
            { type: "Situational", q: "How do you use your external network to gather intelligence that influences the organisation's medium-to-long-term strategy?" },
            { type: "Evidence",    q: "Describe a time you took a leadership role in a coalition of different organisations to drive a sector-wide change." },
            { type: "Challenge",   q: "Share an example of how you have used your network to help the organisation navigate a major external crisis or reputational risk." },
          ],
        },
      },
    ],
  },
];

// ─── INITIAL COMP STATE ───────────────────────────────────────────────────────

function initCompState() {
  const s = {};
  FRAMEWORK.forEach(cluster => {
    cluster.competencies.forEach(comp => {
      s[comp.id] = {
        expanded: false,
        activeLevel: null,
        chosenLevel: null,
        chosenIndicator: null,
      };
    });
  });
  return s;
}

// ─── MAIN COMPONENT: COMPETENCY FINDER ────────────────────────────────────────

export default function App() {
  const [jobTitle, setJobTitle] = useState("");
  const [grade, setGrade]       = useState("");
  const [comps, setComps]       = useState(initCompState());
  const [modal, setModal]       = useState(null);
  const [copied, setCopied]     = useState(false);

  const gradeKey  = grade.trim().toUpperCase();
  const gradeInfo = GRADES[gradeKey] || null;
  const lvlTabs   = uniqueLevels(gradeKey);
  const lvlCounts = levelCounts(gradeKey);

  // ── Core logic ──────────────────────────────────────────────────────────────

  const handleGenerate = () => {
    if (gradeKey && GRADES[gradeKey]) {
      setComps(initCompState());
      return;
    }
    const inf = inferFromTitle(jobTitle);
    if (inf) setModal({ ...inf, mix: GRADES[inf.grade]?.mix || [] });
    else     setComps(initCompState());
  };

  const confirmGrade    = (g) => { setGrade(g); setComps(initCompState()); setModal(null); };
  const continueWithout = ()  => { setComps(initCompState()); setModal(null); };
  const resetSelections = ()  => { setComps(initCompState()); };
  const resetAll        = ()  => { setJobTitle(""); setGrade(""); setComps(initCompState()); };

  const toggleExpanded = (id) =>
    setComps(prev => ({ ...prev, [id]: { ...prev[id], expanded: !prev[id].expanded } }));

  const setActiveLevel = (id, lv) =>
    setComps(prev => ({ ...prev, [id]: { ...prev[id], activeLevel: lv } }));

  const tickIndicator = (compId, level, idx) => {
    const s = comps[compId];
    if (s.chosenLevel === level && s.chosenIndicator === idx) {
      setComps(prev => ({
        ...prev,
        [compId]: { ...prev[compId], chosenLevel: null, chosenIndicator: null, expanded: true },
      }));
      return;
    }
    const cluster = FRAMEWORK.find(c => c.competencies.some(cc => cc.id === compId));
    const count   = cluster.competencies.filter(c => comps[c.id].chosenIndicator !== null).length;
    if (s.chosenIndicator === null && count >= 2) return; // max 2 per cluster
    setComps(prev => ({
      ...prev,
      [compId]: { ...prev[compId], chosenLevel: level, chosenIndicator: idx, expanded: false },
    }));
  };

  const totalSelected = Object.values(comps).filter(s => s.chosenIndicator !== null).length;
  const clusterCounts = FRAMEWORK.map(c => ({
    key:   c.key,
    label: c.label,
    color: c.color,
    count: c.competencies.filter(cc => comps[cc.id].chosenIndicator !== null).length,
  }));
  const isReady = clusterCounts.every(c => c.count === 2);

  const headerAccent = gradeInfo
    ? (lvlTabs.includes("Leading Edge")
        ? LC["Leading Edge"].bg
        : lvlTabs.includes("Accomplished")
        ? LC.Accomplished.bg
        : LC.Skilled.bg)
    : "#374151";

  // ── Clean export for copy to clipboard ──────────────────────────────────────

  const exportSelector = () => {
    const lines = [];

    if (jobTitle) lines.push(`Role: ${jobTitle}`);
    if (grade)    lines.push(`Grade: ${gradeKey}`);
    if (jobTitle || grade) lines.push("");

    FRAMEWORK.forEach(cluster => {
      const selected = cluster.competencies.filter(c => comps[c.id].chosenIndicator !== null);
      if (!selected.length) return;

      lines.push(`${cluster.label}`);
      selected.forEach(comp => {
        const s = comps[comp.id];
        const indicator = comp.indicators[s.chosenLevel]?.[s.chosenIndicator] || "";
        lines.push(`- ${comp.name} (${s.chosenLevel}): ${indicator}`);
      });
      lines.push("");
    });

    return lines.join("\n").trim();
  };

  const copySelector = () => {
    navigator.clipboard.writeText(exportSelector());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // ── Render: Competency Finder ───────────────────────────────────────────────

  return (
    <div style={{ minHeight: "100vh", background: "#f8f6f2", fontFamily: "Georgia, serif" }}>
      {/* App header */}
      <div style={{ background: "#1a1a1a", borderBottom: "3px solid #333" }}>
        <div
          style={{
            maxWidth: 860,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <div style={{ padding: "16px 0 0", marginRight: 32 }}>
            <div
              style={{
                fontSize: 9,
                color: "#555",
                letterSpacing: 3,
                textTransform: "uppercase",
                marginBottom: 2,
              }}
            >
              Competency Finder
            </div>
            <div style={{ color: "#ccc", fontSize: 13 }}>Hiring Manager Suite</div>
          </div>
        </div>
      </div>

      {/* Colour header */}
      <div style={{ background: headerAccent, transition: "background 0.4s" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "18px 24px" }}>
          <h2 style={{ margin: 0, color: "white", fontSize: 18, fontWeight: "normal" }}>
            Competency Finder
          </h2>
          <p style={{ margin: "4px 0 0", color: "rgba(255,255,255,0.7)", fontSize: 12 }}>
            Choose 6 competencies — 2 from each cluster — and select the right behavioural indicator for each.
          </p>
        </div>
        {gradeInfo && (
          <div
            style={{
              background: "rgba(0,0,0,0.2)",
              padding: "10px 24px",
              display: "flex",
              alignItems: "center",
              gap: 14,
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>{gradeKey}</span>
              <span
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.7)",
                  fontStyle: "italic",
