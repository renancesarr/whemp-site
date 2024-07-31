const { exec } = require('child_process');
const psi = require('psi');

async function getPageSpeedMetrics(url, strategy){
  try {
    const { data } = await psi(url, {
      nokey: 'true',
      strategy: strategy || 'mobile',
    });

    const performanceScore = data.lighthouseResult.categories.performance.score * 100;
    const lcp = data.lighthouseResult.audits['largest-contentful-paint'].displayValue;
    const fid = data.lighthouseResult.audits['max-potential-fid'].displayValue;
    const cls = data.lighthouseResult.audits['cumulative-layout-shift'].displayValue;

    return { performanceScore, lcp, fid, cls };
  } catch (error) {
    console.error('Erro ao obter métricas do PageSpeed Insights:', error.message);
    throw error;
  }
}

async function startLocalServe() {
  console.log("Iniciando o servidor local...");
  const server = exec('http-server -p 8080');
  return server;
}


async function checkCoreWebVitals(server) {
  // Iniciar o servidor local
  const server = await startLocalServe();

  // Aguardar alguns segundos para garantir que o servidor está ativo
  setTimeout(async () => {
    // Obter métricas do PageSpeed Insights
    console.log(`Verificando métricas do PageSpeed Insights para http://localhost:8080...`);
    try {
      const { performanceScore, lcp, fid, cls } = await getPageSpeedMetrics('http://localhost:8080');
      console.log(`Pontuação de performance do PageSpeed Insights: ${performanceScore}`);
      console.log(`Largest Contentful Paint (LCP): ${lcp}`);
      console.log(`First Input Delay (FID): ${fid}`);
      console.log(`Cumulative Layout Shift (CLS): ${cls}`);
    } catch (error) {
      console.error('Erro ao obter métricas do PageSpeed Insights.');
    } finally {
      // Parar o servidor local
      server.kill();
    }
  }, 5000); // Aguardar 5 segundos
}

checkCoreWebVitals();
