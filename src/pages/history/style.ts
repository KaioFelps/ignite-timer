import styled from "styled-components";

export const HistoryContainer = styled.main`
  flex: 1;
  padding: 3.5rem;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme["gray-100"]};
  }
`;
export const HistoryList = styled.div`
  flex: 1;
  overflow: auto;
  margin-top: 2rem;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th {
      background: ${({ theme }) => theme["gray-600"]};
      padding: 1rem;
      text-align: left;
      color: ${({ theme }) => theme["gray-100"]};
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }
      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      background: ${({ theme }) => theme["gray-700"]};
      border-top: 4px solid ${(props) => props.theme["gray-800"]};
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        width: 50%;
        padding-left: 1.5rem;
      }
      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }
`;

const STATUS_COLORS = {
  yellow: "yellow-500",
  green: "green-500",
  red: "red-500",
} as const;

/* ---

    # AS CONST

    No Typescript isso declara que os valores dos objetos NUNCA VÃO MUDAR, são apenas esses valores.

    O erro acontecia porque o background do before alertaria que não pode ser qualquer valor, mas sim um existente no tema.

    Ao declarar como const, você afirma que sempre será aquelas três opções somente, e elas existem de fato no theme.

    Isso "acalma" o TS e o avisa que está tudo bem usar aquela constante, pois ela não variará.

--- */

type StatusProps = {
  statusColor: keyof typeof STATUS_COLORS;
};

/* ---

    # KEYOF
    - Pega as chaves do objeto

    #T TYPEOF
    - O Typescript não consegue ler objetos javascript, somente TIPAGENS Typescript, então ele transforma STATUS_COLORS em uma tipagem e pega suas chaves.

    Isso faz com que as chaves do objeto se tornem as possibilidades de string dessa tipagem, deixa "automatico"

--- */

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  /* line-height: 0; */

  &::before {
    content: "";
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 999px;
    background: ${({ theme, statusColor }) =>
      theme[STATUS_COLORS[statusColor]]};
  }
`;

/* ---

  # BORDER COLLAPSE

  Se eu tenho dois elementos um ao lado do outro | | | e boto uma borda de 1 pixel entre eles, teríamos uma borda de 2 pixels (1 de um e 1 de outro);

  A propriedade Border Collapse com valor Collapse vai fazer com que as bordas se colapsem e se unam, sendo assim, teríamos de fato apenas 1 pixel entre esses dois elementos.

--- */
