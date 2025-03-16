import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { workExperience, language = 'en' } = await request.json();
    
    // Extract job titles and responsibilities from work experience
    const jobInfo = workExperience.map((job: any) => ({
      jobTitle: job.jobTitle,
      responsibilities: job.responsibilities.filter((r: string) => r.trim() !== '')
    }));
    
    // Create a prompt for the AI based on the selected language
    const promptByLanguage = {
      en: `Based on the following work experience, analyze the job responsibilities and generate a comprehensive list of skills that would be relevant for a resume. Include both explicitly mentioned skills and related technologies/frameworks that would typically be used together.

For example, if a responsibility mentions "Developed websites using React", infer related skills like HTML, CSS, JavaScript, TypeScript, and potentially Redux or other common React ecosystem tools.

List the most important and core skills for the profession first, followed by secondary or supporting skills.

Only return the skills as a comma-separated list without any additional text or explanations.

Work Experience:
${jobInfo
      .map((job: any) => 
        `Job Title: ${job.jobTitle}\nResponsibilities:\n${job.responsibilities
          .map((r: string) => `- ${r}`)
          .join('\n')}`
      )
      .join('\n\n')}`,
      ru: `На основе следующего опыта работы проанализируйте должностные обязанности и составьте исчерпывающий список навыков, которые будут актуальны для резюме. Включите как явно упомянутые навыки, так и связанные технологии/фреймворки, которые обычно используются вместе.

Например, если в обязанностях упоминается "Разработка веб-сайтов с использованием React", выведите связанные навыки, такие как HTML, CSS, JavaScript, TypeScript и, возможно, Redux или другие распространенные инструменты экосистемы React.

Сначала перечислите наиболее важные и основные навыки для профессии, затем второстепенные или вспомогательные навыки.

Верните только навыки в виде списка, разделенного запятыми, без дополнительного текста или пояснений. Каждый навык должен начинаться с заглавной буквы. ВАЖНО: ВСЕ НАВЫКИ ДОЛЖНЫ БЫТЬ ТОЛЬКО НА РУССКОМ ЯЗЫКЕ.

Опыт работы:
${jobInfo
      .map((job: any) => 
        `Должность: ${job.jobTitle}\nОбязанности:\n${job.responsibilities
          .map((r: string) => `- ${r}`)
          .join('\n')}`
      )
      .join('\n\n')}`
    };
    
    // Get the appropriate prompt based on language
    const prompt = promptByLanguage[language as keyof typeof promptByLanguage] || promptByLanguage.en;
    
    // System message based on language
    const systemMessageByLanguage = {
      en: 'You are an expert resume consultant that analyzes job responsibilities to generate comprehensive skill sets for resumes. You understand the relationships between technologies and can infer related skills even when not explicitly mentioned. List the most important skills for the profession first. You only respond with a comma-separated list of skills without any additional text.',
      ru: 'Вы эксперт-консультант по резюме, который анализирует должностные обязанности для создания комплексных наборов навыков для резюме. Вы понимаете взаимосвязи между технологиями и можете определить связанные навыки, даже если они не упомянуты явно. Сначала перечислите наиболее важные навыки для профессии. Вы отвечаете только списком навыков, разделенных запятыми, без какого-либо дополнительного текста. Каждый навык должен начинаться с заглавной буквы. ВАЖНО: ВСЕ НАВЫКИ ДОЛЖНЫ БЫТЬ ТОЛЬКО НА РУССКОМ ЯЗЫКЕ.'
    };
    
    // Get the appropriate system message based on language
    const systemMessage = systemMessageByLanguage[language as keyof typeof systemMessageByLanguage] || systemMessageByLanguage.en;
    
    // Call OpenRouter API
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://perfect-resume.vercel.app', // Replace with your actual domain
        'X-Title': 'Perfect Resume Builder'
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-chat:free', 
        messages: [
          {
            role: 'system',
            content: systemMessage
          },
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });
    
    const data = await response.json();
    
    // Extract the skills from the response
    let skillsText = data.choices[0].message.content.trim();
    
    // Capitalize first letter of each skill for Russian language
    if (language === 'ru') {
      skillsText = skillsText.split(',').map((skill: string) => {
        const trimmedSkill = skill.trim();
        return trimmedSkill.charAt(0).toUpperCase() + trimmedSkill.slice(1);
      }).join(', ');
      
      // Check if the response contains Cyrillic characters (Russian)
      const containsCyrillic = (text: string) => /[а-яА-Я]/.test(text);
      
      // Instead of checking if the entire response contains Cyrillic characters,
      // we just verify that there are some Cyrillic characters present
      // This allows for technical terms in English (like programming languages)
      // while ensuring the response is predominantly in Russian
      if (!containsCyrillic(skillsText)) {
        console.warn('Received non-Russian skills when Russian was requested.');
        return NextResponse.json(
          { error: 'Failed to generate skills in Russian' },
          { status: 500 }
        );
      }
    }
    
    // Return the skills
    return NextResponse.json({ skills: skillsText });
  } catch (error) {
    console.error('Error generating skills:', error);
    return NextResponse.json(
      { error: 'Failed to generate skills' },
      { status: 500 }
    );
  }
}