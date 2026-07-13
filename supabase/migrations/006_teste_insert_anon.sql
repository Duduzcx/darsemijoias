set role anon;
insert into public.avaliacoes (produto_id, nome, nota, comentario, aprovado)
values ('teste-sql', 'Teste SQL', 5, 'teste direto', false);
reset role;
