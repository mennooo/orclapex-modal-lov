

gc_plugin_version   constant varchar2(10) := '1.0.5';

g_search_field      varchar2(100);

g_item              apex_plugin.t_page_item;
g_plugin            apex_plugin.t_plugin;

------------------------------------------------------------------------------
-- function get_columns_from_query
------------------------------------------------------------------------------
function get_columns_from_query (
    p_query         in varchar2
  , p_min_columns   in number
  , p_max_columns   in number
) return dbms_sql.desc_tab3
is

  l_sql_handler apex_plugin_util.t_sql_handler;

begin

  l_sql_handler := apex_plugin_util.get_sql_handler(
      p_sql_statement   => p_query
    , p_min_columns     => p_min_columns
    , p_max_columns     => p_max_columns
    , p_component_name  => null
  );

  return l_sql_handler.column_list;

end get_columns_from_query;

----------------------------------------------------------
-- procedure print_json_from_sql
----------------------------------------------------------
procedure print_json_from_sql (
    p_query       in varchar2
) is

  -- table van columns van query
  l_col_tab   dbms_sql.desc_tab3;

  -- Bind variables
  l_bind_list apex_plugin_util.t_bind_list;

  -- Resultaat van query
  l_result    apex_plugin_util.t_column_value_list2;

  col_idx     number;
  row_idx     number;

  l_varchar2  varchar2(4000);
  l_number    number;
  l_boolean   boolean;

begin

  -- Eerst kolomnamen ophalen
  l_col_tab := get_columns_from_query(
      p_query       => p_query
    , p_min_columns => 2
    , p_max_columns => 20
  );

  -- Stel de bind variabelen in
  --l_bind_list := null;

  -- Daarna query uitvoeren en resultaten binnenhalen
  -- Bind variables zijn toegestaan
  l_result := apex_plugin_util.get_data2 (
      p_sql_statement     => p_query
    , p_min_columns       => 2
    , p_max_columns       => 20
    , p_component_name    => null
  );

  apex_json.open_object('row');

  apex_json.open_array();

  -- Tot slot JSON object maken van resultaat
  -- Loop eerst door alle rijen
  for row_idx in 1..l_result(1).value_list.count loop

    apex_json.open_object();

    -- Loop per rij door kolommen
    for col_idx in 1..l_col_tab.count loop

      -- Name value pair van kolomnaam en waarde
      case l_result(col_idx).data_type
        when apex_plugin_util.c_data_type_varchar2 then
          apex_json.write(l_col_tab(col_idx).col_name, l_result(col_idx).value_list(row_idx).varchar2_value);
        when apex_plugin_util.c_data_type_number then
          apex_json.write(l_col_tab(col_idx).col_name, l_result(col_idx).value_list(row_idx).number_value);
        when apex_plugin_util.c_data_type_date then
          apex_json.write(l_col_tab(col_idx).col_name, l_result(col_idx).value_list(row_idx).date_value);
      end case;

    end loop;

    apex_json.close_object();

  end loop;

  apex_json.close_all();

end print_json_from_sql;

----------------------------------------------------------
-- function get_display_value
----------------------------------------------------------
function get_display_value (
    p_lookup_query  varchar2
  , p_return_col    varchar2
  , p_display_col   varchar2
  , p_return_val    varchar2
) return varchar2
is

  l_result    apex_plugin_util.t_column_value_list;

  l_query     varchar2(4000);

begin

  l_query := 'select ' || p_display_col || ', ' || p_return_col || ' from (' || trim(trailing ';' from p_lookup_query) || ')';

  l_result := apex_plugin_util.get_data (
      p_sql_statement     => l_query
    , p_min_columns       => 2
    , p_max_columns       => 2
    , p_component_name    => null
    , p_search_type       => apex_plugin_util.c_search_exact_case
    , p_search_column_no  => 2
    , p_search_string     => p_return_val
  );

  -- Resultaat van de query is altijd eerste kolom, eerste rij
  return apex_escape.html(l_result(1)(1));

exception
  when no_data_found then
    return null;

end get_display_value;

----------------------------------------------------------
-- procedure print_lov_data
----------------------------------------------------------
procedure print_lov_data
is

  -- Ajax parameters
  l_search_term     varchar2(4000) := apex_application.g_x02;
  l_first_rownum    number := nvl(to_number(apex_application.g_x03),1);
  l_filter_ind      number(1) := apex_application.g_x04;

  -- Aantal te retourneren rijen
  l_rows_per_page   apex_application_page_items.attribute_02%type := nvl(g_item.attribute_02, 15);

  -- Query voor lookup lijst
  l_lookup_query    varchar2(4000);
  l_filter_yn       apex_application_page_items.attribute_08%type := g_item.attribute_08;
  l_filter_column   apex_application_page_items.attribute_10%type := g_item.attribute_10;

  -- table van columns van lookup query
  l_col_tab         dbms_sql.desc_tab3;

  l_cols_where      varchar2(4000);
  l_cols_select     varchar2(4000);
  l_filter_clause   varchar2(4000);

  l_last_rownum     number;

  l_json            json;

  ----------------------------------------------------------------------------
  -- function concat_columns
  ----------------------------------------------------------------------------
  function concat_columns (
    p_col_tab     in dbms_sql.desc_tab3
  , p_separator   in varchar2
  , p_add_quotes  in boolean default false
  ) return varchar2 is

    l_cols_concat     varchar2(4000);

    l_col             varchar2(50);

  begin

    for idx in 1..p_col_tab.count loop

      l_col := p_col_tab(idx).col_name;

      if p_add_quotes then
        l_col := '"' || l_col || '"';
      end if;

      l_cols_concat := l_cols_concat || l_col;

      if idx < p_col_tab.count then
        l_cols_concat := l_cols_concat || p_separator;
      end if;

    end loop;

    return l_cols_concat;

  end concat_columns;

  ----------------------------------------------------------------------------
  -- function get_where_clause
  ----------------------------------------------------------------------------
  function get_where_clause (
    p_col_tab     in dbms_sql.desc_tab3
  ) return varchar2 is

    l_where     varchar2(4000);

  begin

    for idx in 1..p_col_tab.count loop

      l_where := l_where || '"' || p_col_tab(idx).col_name || '"';

      if idx < p_col_tab.count then
        l_where := l_where || '||';
      else
        l_where := 'regexp_instr(upper(' || l_where || '), p_apex_plgn_lookup_item.search_term) > 0 or p_apex_plgn_lookup_item.search_term is null';
      end if;

    end loop;

    return l_where;

  end get_where_clause;

begin

    /*

      Haal de data op met de door gebruiker opgegeven query
      Er worden standaard max 15 rijen per keer opgehaald, in plugin settings is dit aanpasbaar

    */

    -- Zet de zoekterm in een package variable
    g_search_term := upper(l_search_term);

    -- Een waarde toekennen aan g_search_term lijkt de result_cache van de functie search_term niet de invalideren, daarom wordt dat handmatig gedaan
    dbms_result_cache.invalidate('TWQB7', 'P_APEX_PLGN_LOOKUP_ITEM');

    -- Omdat we geen bind variabelen kunnen gebruiken in de query worden alle bind variabelen vertaald naar de v functie
    l_lookup_query := g_item.lov_definition;

    -- Haal alvast de kolomnamen van de query op, die zijn nodig om een extra WHERE statement te kunnen schrijven voor de zoekoptie
    l_col_tab := get_columns_from_query(
        p_query       => l_lookup_query
      , p_min_columns => 2
      , p_max_columns => 20
    );

    -- Maak van de columns nu een lange string om te gebruiken in het SELECT statement
    -- NU NIET NODIG
    --l_cols_select := concat_columns(l_col_tab, ', ');

    -- Maak van de columns nu een lange string om te gebruiken in het EXISTS statement
    l_cols_where := get_where_clause(l_col_tab);

    -- Kijk of er een filter kolom gedefinieerd is
    if  l_filter_yn = 'Y'  then
      l_filter_clause := 'and ' || l_filter_column || ' = ' || l_filter_ind;
    end if;

    -- Bepaal de laatst op te halen rij
    l_last_rownum := (l_first_rownum + l_rows_per_page  - 1);

    -- Zet de userquery in een subquery om het aantal rijen te kunnen beperken
    -- Voeg ook het WHERE statement om te zoeken toe
    -- Met de lead functie wordt bepaald of er eventueel een volgende set records is voor navigatie in het rapport
    l_lookup_query :=
        'select *'
      || '  from (select src.*'
      || '             , case when rownum### = ' || l_last_rownum || ' then ' -- Zoek het Ã¿Â©Ã¿Â©n na laatste record op
      || '                 lead(rownum) over (partition by null order by null)' -- Kijk of er wel een volgend record bestaat en sorteer op de eerste kolom
      || '               end nextrow###'
      || '          from (select src.*'
      || '                     , row_number() over (partition by null order by null) rownum###' -- Voeg een oplopend rijnummer toe
      || '                  from (' || l_lookup_query || ')src '
      || '                 where exists ( select 1 from dual where ' || l_cols_where || ') ' || l_filter_clause || ') src'
      || '         where rownum### between ' || l_first_rownum || ' and ' || (l_last_rownum + 1) || ')' -- Voeg tijdelijk 1 record toe aan het resultaat om te kijken of er een volgend record is (lead functie)
      || ' where rownum### between ' || l_first_rownum || ' and ' || l_last_rownum; -- Haal het extra record er weer af

    print_json_from_sql(l_lookup_query);

end print_lov_data;

----------------------------------------------------------
-- procedure print_value
----------------------------------------------------------
procedure print_value
is

  l_display         varchar2(4000);

  -- Ajax parameters
  l_return_value    varchar2(4000) := apex_application.g_x02;

  -- Bind variables
  l_bind_list       apex_plugin_util.t_bind_list;

  -- De kolom die de waarde van het item zet
  l_return_col      apex_application_page_items.attribute_03%type := g_item.attribute_03;
  l_display_col     apex_application_page_items.attribute_04%type := g_item.attribute_04;

begin

    -- Bepaal de display value op basis van de waarde van de return column (p_value)
    l_display := get_display_value(
        p_lookup_query  => g_item.lov_definition
      , p_return_col    => l_return_col
      , p_display_col   => l_display_col
      , p_return_val    => l_return_value
    );

  apex_json.open_object();

  apex_json.write('returnValue', l_return_value);
  apex_json.write('displayValue', l_display);

  apex_json.close_object();

end print_value;

----------------------------------------------------------
-- function render
----------------------------------------------------------
procedure render (
  p_item   in apex_plugin.t_item,
  p_plugin in apex_plugin.t_plugin,
  p_param  in apex_plugin.t_item_render_param,
  p_result in out nocopy apex_plugin.t_item_render_result
)
is

type t_item_render_param is record (
  value_set_by_controller boolean default false,
  value                   varchar2(32767),
  is_readonly             boolean default false,
  is_printer_friendly     boolean default false
  );

  l_return              apex_plugin.t_page_item_render_result;

  -- De grootte van de LOV modal
  l_size                apex_application_page_items.attribute_01%type := p_item.attribute_01;

  -- Aantal te retourneren rijen
  l_rows_per_page       apex_application_page_items.attribute_02%type := nvl(p_item.attribute_02, 15);

  -- De kolom die de waarde van het item zet
  l_return_col          apex_application_page_items.attribute_03%type := p_item.attribute_03;

  -- De kolom die de zichtbare waarde van het item zet (dus geen onderdeel van de submit)
  l_display_col         apex_application_page_items.attribute_04%type := p_item.attribute_04;

  -- Kolom headers weergeven?
  l_show_headers        boolean := p_item.attribute_05 = 'Y';

  -- Titel van de lookup modal region
  l_title               apex_application_page_items.attribute_06%type := p_item.attribute_06;

  -- Foutmelding om te tonen na validatie
  l_validation_err      apex_application_page_items.attribute_07%type := p_item.attribute_07;

  -- Een filter checkbox toevoegen?
  l_filter_yn           apex_application_page_items.attribute_08%type := p_item.attribute_08;

  -- Filter label
  l_filter_label        apex_application_page_items.attribute_09%type := p_item.attribute_09;

  -- Filter column
  l_filter_col          apex_application_page_items.attribute_10%type := p_item.attribute_10;

  -- Search placeholder
  l_search_placeholder  apex_application_page_items.attribute_11%type := p_item.attribute_11;

  -- No data found message
  l_no_data_found       apex_application_page_items.attribute_12%type := p_item.attribute_12;

  -- Mogen rijen in de LOV groter dan 1 regel worden?
  l_multiline_rows      boolean := p_item.attribute_13 = 'Y';

  -- Pagina items die gesubmit moete worden
  l_page_items_to_submit apex_application_page_items.attribute_14%type := p_item.attribute_14;

  -- De waarde voor het display veld
  l_display             varchar2(4000);

  l_html                varchar2(32000);
  l_vc_arr2             apex_application_global.vc_arr2;
  
  l_ignore_change       varchar2(15);

begin

  -- Bepaal de display value op basis van de waarde van de return column (p_value)
  l_display := get_display_value(
      p_lookup_query  => p_item.lov_definition
    , p_return_col    => l_return_col
    , p_display_col   => l_display_col
    , p_return_val    => p_param.value
  );

  --
  -- printer friendly display
  if p_param.is_printer_friendly then
    apex_plugin_util.print_display_only (
        p_item_name        => p_item.name
      , p_display_value    => p_param.value
      , p_show_line_breaks => false
      , p_escape           => p_item.escape_output
      , p_attributes       => p_item.element_attributes
    );

  -- read only display
  elsif p_param.is_readonly then
    apex_plugin_util.print_display_only (
        p_item_name        => p_item.name
      , p_display_value    => l_display
      , p_show_line_breaks => false
      , p_escape           => p_item.escape_output
      , p_attributes       => p_item.element_attributes
    );

  -- normal display
  else

    apex_javascript.add_library (
        p_name                  => 'lookup-item'
      , p_directory             => p_plugin.file_prefix
      , p_version               => null
      , p_check_to_add_minified => true
    );
    
    
    
    -- Voeg CSS toe
    apex_css.add(
      p_css => 
        '.a-GV-columnItem .apex-item-group {
          width: 100%;
        }
        .a-GV-columnItem .oj-form-control { 
          max-width: none;
          margin-bottom: 0;
        }'
    , p_key => 'ig_jet_item_plugin'
    );
    
    if p_item.ignore_change then
      l_ignore_change := 'js-ignoreChange';
    end if;
    
    if v('APP_ID') between 130 and 143 then

      htp.prn('<div class="input-group lookup right-addon no-right-radius">');
      htp.prn(' <input type="text" id="' || p_item.name || '_DISPLAY"  ' || case when p_item.is_required then 'required' else null end || ' value="' || l_display || '" class="text_field full-width ' || p_item.element_css_classes || '" size="' || p_item.element_width || '" maxlength="' || p_item.element_max_length || '" autocomplete="off" class="' || p_item.element_css_classes || '" placeholder="' || p_item.placeholder || '">');
      htp.prn(' <input type="hidden" id="' || p_item.name || '" name="' || apex_plugin.get_input_name_for_page_item(p_is_multi_value=>false) || '" value="' || p_param.value || '" data-display="' || l_display || '">');
      htp.prn(' <span class="search-clear fa fa-times-circle-o"></span>');
      htp.prn(' <div class="input-group-addon" id="' || p_item.name || '_BUTTON">');
      htp.prn('   <i class="fa fa-search fa-fw"></i>');
      htp.prn(' </div>');
      htp.prn('</div>');

    else

      l_html :=
        '<input type="hidden" id="#ID#" name="#NAME#" value="#VALUE#" data-display="#DISPLAY_VALUE#" class="'||l_ignore_change||'">
          <input type="text" class="apex-item-text twq-lookup-item '||l_ignore_change||' #CSS_CLASSES#" id="#ID#_DISPLAY" #REQUIRED# name="#NAME#" maxlength="#MAX_LENGTH#" size="#SIZE#" value="#DISPLAY_VALUE#" autocomplete="off" placeholder="#PLACEHOLDER#">
          <span class="search-clear fa fa-times-circle-o"></span>
          <button type="button" id="#ID#_BUTTON" class="a-Button twq-lookup-button a-Button--popupLOV">
            <span class="a-Icon fa fa-search"></span>
          </button>';

      l_html := replace(l_html, '#ID#', p_item.name);
      l_html := replace(l_html, '#NAME#', apex_plugin.get_input_name_for_page_item(p_is_multi_value=>false));
      l_html := replace(l_html, '#REQUIRED#', case when p_item.is_required then 'required' else null end);
      l_html := replace(l_html, '#MAX_LENGTH#', p_item.element_max_length);
      l_html := replace(l_html, '#SIZE#', p_item.element_width);
      l_html := replace(l_html, '#VALUE#', p_param.value);
      l_html := replace(l_html, '#DISPLAY_VALUE#', l_display);
      l_html := replace(l_html, '#PLACEHOLDER#', p_item.placeholder);
      l_html := replace(l_html, '#CSS_CLASSES#', p_item.element_css_classes);

      htp.prn(l_html);
    
    end if;
    
    if p_item.ajax_items_to_submit is not null then
      if l_page_items_to_submit is not null then
        l_page_items_to_submit := l_page_items_to_submit||',';
      end if;
      l_page_items_to_submit := l_page_items_to_submit
                              || apex_plugin_util.item_names_to_jquery(p_item_names => p_item.ajax_items_to_submit, p_item => p_item);
    end if;
    if p_item.lov_cascade_parent_items is not null then
      if l_page_items_to_submit is not null then
        l_page_items_to_submit := l_page_items_to_submit||',';
      end if;
      l_page_items_to_submit := l_page_items_to_submit
                              || apex_plugin_util.item_names_to_jquery(p_item_names => p_item.lov_cascade_parent_items, p_item => p_item);
    end if;

    -- Initialize rest of the plugin with javascript
    apex_javascript.add_onload_code (
      p_code => '$("#' ||p_item.name || '_DISPLAY").lookupItem({'
                  || 'id: "' || p_item.name || '_MODAL",'
                  || 'title: "' || l_title || '",'
                  || 'itemLabel: "' || p_item.plain_label || '",'
                  || 'returnItem: "' ||p_item.name || '",'
                  || 'displayItem: "' ||p_item.name || '_DISPLAY",'
                  || 'searchField: "' ||p_item.name || '_SEARCH",'
                  || 'searchButton: "' || p_item.name || '_BUTTON",'
                  || 'ajaxIdentifier: "' || apex_plugin.get_ajax_identifier || '",'
                  || 'showHeaders: ' || case when l_show_headers then 'true' else 'false' end || ','
                  || 'returnCol: "' || upper(l_return_col) || '",'
                  || 'displayCol: "' || upper(l_display_col) || '",'
                  || 'filterCol: "' || upper(l_filter_col) || '",'
                  || 'validationError: "' || l_validation_err || '",'
                  || 'includeFilter: ' || case when l_filter_yn = 'Y' then 'true' else 'false' end || ','
                  || 'filterLabel: "' || l_filter_label || '",'
                  || 'searchPlaceholder: "' || l_search_placeholder || '",'
                  || 'cascadingItems: ' || apex_plugin_util.page_item_names_to_jquery(p_item.lov_cascade_parent_items) || ','
                  || 'modalSize: "' || l_size || '",'
                  || 'noDataFound: "' || l_no_data_found || '",'
                  || 'allowMultilineRows: ' || case l_multiline_rows when true then 'true' else 'false' end  || ','
                  || 'rowCount: ' || l_rows_per_page || ','
                  || 'pageItemsToSubmit: "' || l_page_items_to_submit || '"'
              ||'});'
    );

  end if;


end render;

--------------------------------------------------------------------------------
-- function ajax
--------------------------------------------------------------------------------
procedure ajax(
  p_item   in            apex_plugin.t_item,
  p_plugin in            apex_plugin.t_plugin,
  p_param  in            apex_plugin.t_item_ajax_param,
  p_result in out nocopy apex_plugin.t_item_ajax_result )
is

  -- Ajax parameters
  l_action          varchar2(4000) := apex_application.g_x01;


  -- return attribute
  l_result          apex_plugin.t_page_item_ajax_result;

begin

  g_item := p_item;
  g_plugin := p_plugin;

  -- controleer welke actie de ajax functie moet uitvoeren
  if l_action = 'GET_DATA' then

    print_lov_data;

  elsif l_action = 'GET_VALUE' then

    print_value;

  end if;

end ajax;

----------------------------------------------------------
-- function search_term
----------------------------------------------------------
function search_term
return varchar2 result_cache is
  l_search_term varchar2(4000);
begin

  -- Deze functie wordt aangeroepen in de dynamic SQL query van de LOV (source query van de plugin)
  -- Door de result_cache toevoeging is het sneller (zeker 3 maal zo snel)
  -- Een waarde toekennen aan g_search_term lijkt de result_cache niet de invalideren, daarom wordt dat handmatig gedaan

  -- Een andere oplossing was om te verwijzen naar v('APP_AJAX_X02'), maar in dit geval is verwijzen naar de package variable handiger en sneller

  l_search_term := g_search_term;

  -- Escape spacial chars (werkt nog niet goed)
  --l_search_term := replace(l_search_term, '.', '\.');

  -- De zoekterm moet herschreven worden naar een reguliere expressie
  l_search_term := replace(translate(l_search_term, ' %', '**'), '*', '.*');



  return l_search_term;

end search_term;