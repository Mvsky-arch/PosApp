export default function Home() {
  return (
    <div className="container mx-auto m-4">
      <h1>Sania App {process.env.CRYPTO_SECRET_KEY}</h1>
    </div>
  );
}
