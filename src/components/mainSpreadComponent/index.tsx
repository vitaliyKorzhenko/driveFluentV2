import React from 'react';

import { SpreadAppContext } from './SpreadContext';
import { ISpreadComponentProps, ISpreadComponentState } from './types';

import './Charts/spread-d3.css'
import { translate } from '../../localization/localization';

// Namespace - (different in SpreadJS 8 / 9 / 10, so better to use a shortcut)
const spreadNS = GcSpread.Sheets;

export class SpreadComponent extends React.Component<ISpreadComponentProps, ISpreadComponentState> {

  
  // References
  private refSpread = React.createRef<HTMLDivElement>();
  private refFormulaBar = React.createRef<HTMLDivElement>();
  private refFormulaElem = React.createRef<HTMLDivElement>();
  private refPositionBox = React.createRef<HTMLInputElement>();
  private refStyleElem = React.createRef<HTMLInputElement>();


  constructor(props: any) {
    super(props);

    this.state = {}
  }

  public spread: GcSpread.Sheets.Spread | null = null;
  public spreadFormulaTextBox: GcSpread.Sheets.FormulaTextBox | null = null;

  initTips = () => {
    if (!this.spread) return;

    this.spread.showScrollTip(3);
    this.spread.showResizeTip(3);
    this.spread.showDragDropTip(true);
    this.spread.showDragFillTip(true);
  }

    private static lastId = 0;
    // HTML ID for SpreadJS component
    private idSpread = SpreadComponent.generateId("spread");

    private static generateId(prefix = 'id') {
      let idStr = prefix;
      do {
        this.lastId++;
        idStr = this.lastId == 1 ? prefix : `${prefix}${this.lastId}`
      } while (document.getElementById(idStr));
      return idStr;
    }
    // HTML ID for d3-tips (tips shown on chart hover)
    private idTips = 'spreadd3tip' + SpreadComponent.lastId;

  private initSpread() {
    // Set localized new sheet name (default: "Sheet")
    const defSheetNameLocValue = translate("SHEET", "Sheet");
    (window as any)['defSheetName'] = defSheetNameLocValue;

    // Init spread
    this.spread = new spreadNS.Spread(this.refSpread.current, { sheetCount: 1 });//window['initspread'](this.idSpread);//
    // Pass to floating objects - unique class name for d3-tips
    this.spread[SpreadFloatingD3Chart.FIELD_SPREADTIPSD3] = this.idTips;

    // Spread actions
    this.spreadActions.spread = this.spread;
    
    this.initTips();
    //this.spread.useWijmoTheme = true;this.spread.repaint();

    // Formula box
    this.spreadFormulaTextBox = new spreadNS.FormulaTextBox(this.refFormulaElem.current /* was: document.getElementById('formulabox') */);
    this.spreadFormulaTextBox.spread(this.spread);

    // Default style
    const style = new spreadNS.Style();
    style.hAlign = 2;
    style.vAlign = spreadNS.VerticalAlign.bottom;
    // New: autofit sometimes does not work, shrink numbers
    style.shrinkToFit = true;
    style.name = 'styleDefNumber';
    // style.formatter = data.namedStyles[i].formatter;
    this.spread.addNamedStyle(style);

    // bind event when selection is changed
    this.spread.bind(spreadNS.Events.SelectionChanged,this.selectionChanged );
    
    this.spread.bind(spreadNS.Events.UserZooming, this.spreadUserZooming);

    this.spread.bind(spreadNS.Events.PictureSelectionChanged, (_e, info) => this.floatingObjectSelectionChanged(info.picture, info.sheetName));
    this.spread.bind(spreadNS.Events.FloatingObjectRemoved, (_sender, _args) => this.panelChartEditDisable());
    this.spread.bind(spreadNS.Events.FloatingObjectSelectionChanged, (_e, info) => this.floatingObjectSelectionChanged(info.floatingObject, info.sheetName));
    this.spread.bind(spreadNS.Events.FloatingObjectChanged, SpreadFloatingD3ChartEvents.FloatingObjectChanged);
    this.spread.bind(spreadNS.Events.CustomFloatingObjectLoaded,
      (sender, args) => SpreadFloatingD3ChartEvents.CustomFloatingObjectLoaded(
        sender,
        args,
        (e) => this.onChartContext(e),
        (e) => this.onChartDblClick(e)
      )
    );
    // Active sheet changed
    this.spread.bind(spreadNS.Events.ActiveSheetChanged, this.activeSheetChanged);
    // Touch-screen present: handle tap-tap menu and instead show our context menu
    this.spread.bind(spreadNS.Events.TouchToolStripOpening, (_e, info) => this.touchToolStripOpening(_e, info));
    // New sheet added from the tabs
    this.spread.bind(spreadNS.Events.SheetTabClick, (_sender, args) => {
      if (args.sheet === null && args.sheetName === null) {
        setTimeout(() => this.applyNewSheetDefStyles(null), 300);
      }
    });
    this.spread.bind(spreadNS.Events.ClipboardPasted, this.clipboardPasted);

    // TODO: any changes/events to active sheet must be also in fromJSON()
    // if no data to load
    const activeSheet = this.spread.getActiveSheet();
    activeSheet.setActiveCell(0, 0);
    this.sheetPostLoad(activeSheet);
    

    // was: this.spread['onEndZoom'] = (sheet) => this.runUpdateZoomTimer(sheet);

    this.props.dataProvider.loadData()
        .then((value: string) => this.loadDataFromJson(value))
        
        /*
        Catch would never catch as we handle errors in loadData(), 
        but if we use multiple spread components we can decide to display errors overlaying the spread.
        .catch((reason: any) => {});
        */

    // Focus spreadsheet
    this.spread.focus();
  }

    // Sets a position label (top-left of the spread, left to the formula box) value
    private setPositionLabel(value: string) {
      if (!this.refPositionBox.current) return;
      this.refPositionBox.current.value = value;
    }
  

  public blurFocus(): void {
    console.log('blurFocus...');
  }

  render() {
    console.error('Spread render...')

    return (
      <SpreadAppContext.Consumer>
        {
          _context => (
            <>
              <div id="" className="pusher" style={{ width: '100%', height: 'calc(100% - 50px)' }}>
                <input id="styleElem" type="text" ref={this.refStyleElem} style={{ display: "none" }} />
                <div id="formulaBar" className="formulaBarConteiner" ref={this.refFormulaBar}>
                  <table>
                    <tbody>
                      <tr>
                        <td width="10%">
                          <input type="text" readOnly ref={this.refPositionBox} id="positionbox" />
                        </td>
                        <td className="noselect">
                          <img id="office-splitter" alt=":" 
                            style={{ maxWidth: "100%", verticalAlign: "middle", boxSizing: "border-box"}}
                            src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAAXNSR0IDN8dNUwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAACpJREFUCNdjvHfvHgMINDQ0/IfSjCCaiQEHYITpQAc4dcAlQHbA7BlwOwCqJhXcrljHngAAAABJRU5ErkJggg=="}
                          />
                        </td>
                        <td width="90%">
                          <div className="formulaBox" contentEditable="true" spellCheck="false" ref={this.refFormulaElem}></div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div
                  id="spreadComponent"
                  ref={this.refSpread}
                  className="spreadcomponent"
                  style={{ height: "calc(100% - 30px)" }}
                  onContextMenu={() => {
                    console.log('SpreadComponent onContextMenu...');
                    return false;
                   }}
                ></div>
              </div>
            </>
          )
        }
      </SpreadAppContext.Consumer>
    );
  }

}

SpreadComponent.contextType = SpreadAppContext;
