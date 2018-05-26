create or replace PACKAGE "P_APEX_PLGN_LOOKUP_ITEM" is

  /*

  Deze package is aangemaakt voor het Apex Lookup Item

  Het maakt:
  - een input veld met zoekknop aan de rechterzijde en een clear knopje.
  - een hidden veld om het nr op te slaan.

  Deze item plugin moet samenwerken met een modal report region. Die region wordt getoond als er op de zoekknop geklikt wordt.

  In het report zal een query staan wat meestal lijkt op een LOV. Er kan gezocht worden.



  1.00  13-07-2015 MHO  Creatie
  1.01  13-11-2015 MHO  procedure print_value toegevoegd voor apex.item.setValue in JavaScript
  1.02  26-08-2016 MHO  excape_output toegevoegd bij readonly render
  1.03  02-02-2017 MHO  dbms_sql.desc_tab3 in get_json_from_sql
  1.04  23-03-2017 MHO  in apex 5.1 kun je column info direct ophalen bij get_data2
  1.05  13-12-2017 SR   render en ajax funties omgezet in procedures
  1.06  29-01-2018 MHO  uitzondering op 1.05 voor tablettools

  */

  package_name     varchar2(30)  := 'p_apex_plgn_lookup_item';
  package_versie   varchar2(20)  := 'v1.06' ;

  g_search_term    varchar2(4000);
  ----------------------------------------------------------
  -- function render
  ----------------------------------------------------------
  procedure render (
    p_item   in apex_plugin.t_item,
    p_plugin in apex_plugin.t_plugin,
    p_param  in apex_plugin.t_item_render_param,
    p_result in out nocopy apex_plugin.t_item_render_result
  );

  --------------------------------------------------------------------------------
  -- function ajax
  --------------------------------------------------------------------------------
  procedure ajax(
    p_item   in            apex_plugin.t_item,
    p_plugin in            apex_plugin.t_plugin,
    p_param  in            apex_plugin.t_item_ajax_param,
    p_result in out nocopy apex_plugin.t_item_ajax_result );

  ----------------------------------------------------------
  -- function search_term
  ----------------------------------------------------------
  function search_term
  return varchar2 result_cache;

  ----------------------------------------------------------
  -- function package_name_version
  ----------------------------------------------------------
  function package_name_version /* [{#} 13-12-2017 13:53:23 {#}] */
  return varchar2;


end p_apex_plgn_lookup_item;
