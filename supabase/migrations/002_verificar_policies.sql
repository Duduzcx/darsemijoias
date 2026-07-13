-- Rode isso pra ver quais policies existem hoje na tabela avaliacoes
select policyname, cmd, roles, qual, with_check
from pg_policies
where tablename = 'avaliacoes';
