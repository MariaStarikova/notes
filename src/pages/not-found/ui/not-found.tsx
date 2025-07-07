import './not-found.scss';

export function NotFound() {
  return (
    <div className="not-found">
      <h2>К сожалению, такой страницы не существует :(</h2>
      <a href="/">Вернуться на главную</a>
    </div>
  );
}
