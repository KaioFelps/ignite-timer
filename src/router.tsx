import { Routes, Route } from "react-router-dom";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { History } from "./pages/history";
import { Home } from "./pages/home";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  );
}

// Path => Endereço que o usuário final estará acessando
// Element => Componente que vai ser mostrado ao acessar aquele caminho

/* ---

O route com element DefaultLayout importa o layout da nossa página, seu path indica que aquele layout será aplicado para todas as urls que começarem daquela maneira.
Como o route tem routes como filhos, esses routes filhos precisarão acessar o pai para serem acessados.

Vamos ao exemplo da página admin:

  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/forum" element={<Forum />} />
      </Route>
    </Routes>
  );

Agora além do layout normal, quando acessarmos o /admin teremos um layout totalmente diferente do restante da aplicação web;
Para acessar as subpáginas, por exemplo, teriamos que acessar o link abaixo:
    - localhost:3000/admin/products
Notou que sem o admin acessariamos o DefaultLayout?

O conteúdo de dentro vai ser aplicado dentro do <Outlet/> que se encontra no arquivo tsx do layout, como se fossem componentes enviados como props.

--- */
