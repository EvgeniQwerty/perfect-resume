import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { responsibilities, jobTitle, language = 'en' } = await request.json();
    
    // Filter out empty responsibilities
    const filteredResponsibilities = responsibilities.filter((r: string) => r.trim() !== '');
    
    // Create a prompt for the AI based on the selected language
    const promptByLanguage = {
      en: `Transform the following job responsibilities for a ${jobTitle} position into more impactful, achievement-oriented statements. 

For each responsibility:
1. Add specific metrics or outcomes where possible (e.g., "increased sales by X%", "reduced costs by Y%")
2. Use strong action verbs
3. Highlight the impact and results of the actions

If there are fewer than 5 responsibilities, please generate additional relevant responsibilities for a ${jobTitle} position to reach a total of 5.

Current Responsibilities:
${filteredResponsibilities.map((r: string, i: number) => `${i+1}. ${r}`).join('\n')}

Respond with a JSON array of enhanced responsibilities. Each item should be a complete responsibility statement without prefixes like "responsibility:" and without splitting by commas.`,
      ru: `Преобразуйте следующие должностные обязанности для позиции ${jobTitle} в более эффективные, ориентированные на достижения формулировки на РУССКОМ языке. 

Для каждой обязанности:
1. Добавьте конкретные показатели или результаты, где это возможно (например, "увеличил продажи на X%", "сократил расходы на Y%")
2. Используйте сильные глаголы действия
3. Подчеркните влияние и результаты действий

Если обязанностей меньше 5, пожалуйста, сгенерируйте дополнительные релевантные обязанности для позиции ${jobTitle}, чтобы достичь в общей сложности 5.

Текущие обязанности:
${filteredResponsibilities.map((r: string, i: number) => `${i+1}. ${r}`).join('\n')}

Ответьте JSON-массивом улучшенных обязанностей на РУССКОМ языке. Каждый элемент должен быть полной формулировкой обязанности без префиксов вроде "responsibility:" и без разделения запятыми на отдельные строки. ВАЖНО: ВСЕ ОБЯЗАННОСТИ ДОЛЖНЫ БЫТЬ ТОЛЬКО НА РУССКОМ ЯЗЫКЕ.`
    };
    
    // Get the appropriate prompt based on language
    const prompt = promptByLanguage[language as keyof typeof promptByLanguage] || promptByLanguage.en;
    
    // System message based on language
    const systemMessageByLanguage = {
      en: 'You are an expert resume consultant that transforms basic job responsibilities into impactful, achievement-oriented statements. You understand how to highlight accomplishments and quantify results. You respond only with a JSON array of enhanced responsibilities.',
      ru: 'Вы эксперт-консультант по резюме, который превращает базовые должностные обязанности в эффективные, ориентированные на достижения формулировки НА РУССКОМ ЯЗЫКЕ. Вы понимаете, как выделить достижения и количественно оценить результаты. Вы отвечаете только JSON-массивом улучшенных обязанностей на русском языке. Никогда не используйте английский язык в ответе. ВСЕ ОБЯЗАННОСТИ ДОЛЖНЫ БЫТЬ ТОЛЬКО НА РУССКОМ ЯЗЫКЕ.'
    };
    
    // Get the appropriate system message based on language
    const systemMessage = systemMessageByLanguage[language as keyof typeof systemMessageByLanguage] || systemMessageByLanguage.en;
    
    // Call OpenRouter API
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://perfect-resume.vercel.app',
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
        ],
        response_format: { type: "json_object" }
      })
    });
    
    const data = await response.json();
    
    // Extract the enhanced responsibilities from the response
    let enhancedResponsibilities;
    try {
      // Try to parse the content as JSON
      const contentObj = JSON.parse(data.choices[0].message.content.trim());
      enhancedResponsibilities = Array.isArray(contentObj) ? contentObj : contentObj.responsibilities;
      
      // Clean the responsibilities by removing JSON syntax artifacts
      if (Array.isArray(enhancedResponsibilities)) {
        enhancedResponsibilities = enhancedResponsibilities.map((resp: string) => {
          // Remove surrounding quotes if they exist
          let cleaned = resp;
          if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
            cleaned = cleaned.substring(1, cleaned.length - 1);
          }
          // Remove JSON brackets and quotes that might appear in the text
          cleaned = cleaned.replace(/\[|\]|```json|```/g, '');
          // Remove "responsibility:" prefix that might appear in Russian responses
          cleaned = cleaned.replace(/^responsibility:\s*/i, '');
          // Fix comma-separated lines by joining them
          cleaned = cleaned.replace(/,\s*$/, '');
          return cleaned;
        });
      }
    } catch (e) {
      // If parsing fails, treat the content as a plain text list
      enhancedResponsibilities = data.choices[0].message.content
        .trim()
        .split('\n')
        .filter((line: string) => line.trim() !== '')
        .map((line: string) => {
          // Remove JSON brackets, quotes, and other syntax artifacts
          let cleaned = line.replace(/\[|\]|```json|```|"|\{|\}/g, '').trim();
          // Remove "responsibility:" prefix that might appear in Russian responses
          cleaned = cleaned.replace(/^responsibility:\s*/i, '');
          // Remove numbered prefixes like "1. ", "2. ", etc.
          cleaned = cleaned.replace(/^\d+\.\s*/, '');
          // Fix comma-separated lines by joining them
          cleaned = cleaned.replace(/,\s*$/, '');
          return cleaned;
        });
    }
    
    // Filter out any empty responsibilities after processing
    enhancedResponsibilities = enhancedResponsibilities.filter((resp: string) => resp.trim() !== '');
    
    // Remove trailing periods and period-comma combinations from all responsibilities
    enhancedResponsibilities = enhancedResponsibilities.map((resp: string) => {
      // First trim the string
      let cleaned = resp.trim();
      // Check if the responsibility ends with a period-comma combination and remove it
      if (cleaned.endsWith('.,')) {
        cleaned = cleaned.slice(0, -2);
      }
      // Check if the responsibility ends with a period and remove it
      else if (cleaned.endsWith('.')) {
        cleaned = cleaned.slice(0, -1);
      }
      // Check if the responsibility ends with a comma and remove it
      else if (cleaned.endsWith(',')) {
        cleaned = cleaned.slice(0, -1);
      }
      return cleaned;
    });
    
    // For Russian language, do additional cleaning and verification
    if (language === 'ru') {
      enhancedResponsibilities = enhancedResponsibilities.map((resp: string) => {
        // Remove any English text that might have been included
        let cleaned = resp.replace(/responsibility:\s*/gi, '');
        // Remove any trailing commas
        cleaned = cleaned.replace(/,\s*$/, '');
        return cleaned;
      });
      
      // Check if the response contains Cyrillic characters (Russian)
      const containsCyrillic = (text: string) => /[а-яА-Я]/.test(text);
      
      // Instead of checking every responsibility, check if the overall response contains sufficient Cyrillic text
      // This allows for technical terms in English while ensuring the response is predominantly in Russian
      const hasEnoughCyrillicText = enhancedResponsibilities.some(resp => containsCyrillic(resp));
      
      if (!hasEnoughCyrillicText && filteredResponsibilities.length > 0) {
        console.warn('Received non-Russian responsibilities when Russian was requested. Returning original responsibilities.');
        return NextResponse.json({ 
          enhancedResponsibilities: filteredResponsibilities,
          error: 'Failed to generate Russian responsibilities'
        });
      }
    }
    
    // Return the enhanced responsibilities
    return NextResponse.json({ enhancedResponsibilities });
  } catch (error) {
    console.error('Error enhancing responsibilities:', error);
    return NextResponse.json(
      { error: 'Failed to enhance responsibilities' },
      { status: 500 }
    );
  }
}