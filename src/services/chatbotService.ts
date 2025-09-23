
interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface DeepSeekResponse {
  choices: Array<{
    message: {
      content: string;
      role: string;
    };
  }>;
}

const WEBSITE_CONTEXT = `
You are a helpful AI assistant for a company website that specializes in multiple business sectors including:

1. CERAMIC TILES - Italian technology meets Ethiopian craftsmanship for world-class ceramic tiles
   - We manufacture high-quality ceramic tiles using advanced Italian equipment
   - Our collections include various categories, sizes, finishes, and colors
   - We offer tiles for residential, commercial, industrial, and outdoor applications
   - Our manufacturing facility combines Italian ceramic technology with skilled Ethiopian craftsmanship
   - We maintain international quality standards with ISO 9001 certification

2. BATHROOM SOLUTIONS - Complete bathroom products and installations
   - We offer a wide range of bathroom products including toilets, sinks, showers, and accessories
   - Our installation services cover residential and commercial projects
   - We provide design consultation and project management services

3. REAL ESTATE - Property development and management services

4. AGRICULTURE - Including avocado farming (fresh avocados and avocado oil), coffee production, and cereal crops

5. MANUFACTURING - Various manufacturing capabilities beyond ceramics

The company is committed to:
- Quality excellence using advanced technology
- Sustainable production practices
- Customer satisfaction and service
- Innovation in all business sectors
- Supporting local Ethiopian economy while maintaining international standards

When users ask about products, pricing, or services, be helpful and informative. Direct them to contact the company for specific quotes or detailed information. Always maintain a professional and friendly tone.
`;

export const sendChatMessage = async (message: string, conversationHistory: ChatMessage[] = []): Promise<string> => {
  const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY;
  
  if (!apiKey) {
    throw new Error('DeepSeek API key is not configured. Please add VITE_DEEPSEEK_API_KEY to your .env file.');
  }

  const messages: ChatMessage[] = [
    { role: 'system', content: WEBSITE_CONTEXT },
    ...conversationHistory,
    { role: 'user', content: message }
  ];

  try {
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages,
        max_tokens: 1000,
        temperature: 0.7,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`DeepSeek API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data: DeepSeekResponse = await response.json();
    
    if (!data.choices || data.choices.length === 0) {
      throw new Error('No response from DeepSeek API');
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling DeepSeek API:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to get response from chatbot');
  }
};
