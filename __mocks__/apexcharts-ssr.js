// Mock for apexcharts/ssr module
const ApexCharts = {
  renderToHTML: jest.fn().mockResolvedValue('<div class="apexcharts-canvas">Chart HTML</div>'),
}

export default ApexCharts
