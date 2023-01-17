import { Template } from 'src/services/bot/types';

class Data2ChartTemplate implements Template {
  getTemplate(question: string, data: any) {
    return `# TypeScript
    type Column = string;
    interface Chart { title: string }
    interface PieChart extends Chart { label: Column; value: Column }
    interface LineChart extends Chart { x: Column; y: Column | Column[]; }
    interface BarChart extends Chart  { x: Column; y: Column | Column[]; }
    interface NumberCard extends Chart  { label?: Column; value: Column; }
    interface Table extends Chart  { columns: Column[]; }
    
    If the result only has one number, use NumberCard
    If the result has multiple number columns, use LineChart or BarChart
    If the result has a time column and a number column, use LineChart
    If the result is a numerical distribution, use BarChart
    If the result has a percentage column, use PieChart
    If not sure, use Table
        
    # Example
    Question: how many stories created yesterday
    Data: [{"stories": 378}]
    Chart: {"chartName": "NumberCard", "title": "Number of Stories Created Yesterday", "value": "stories"}
    
    ---
    Let's think step by step, generate the chart option json for the following question and data.
    Question: ${question}
    Data: ${JSON.stringify(data)}
    Chart: 
    `;
  }
}

export default Data2ChartTemplate;
