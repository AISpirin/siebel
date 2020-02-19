if (typeof(SiebelAppFacade.ContactActivityListAppletPR) === "undefined")
{
    SiebelJS.Namespace("SiebelAppFacade.ContactActivityListAppletPR");
    define("siebel/custom/ContactActivityListAppletPR", ["siebel/jqgridrenderer"], function()
    {
        SiebelAppFacade.ContactActivityListAppletPR = (function()
        {

            function ContactActivityListAppletPR(pm)
            {
                SiebelAppFacade.ContactActivityListAppletPR.superclass.constructor.apply(this, arguments);
            }

            SiebelJS.Extend(ContactActivityListAppletPR, SiebelAppFacade.JQGridRenderer);
            let getCreated = "";
            let getUpdated = "";
            let getCreatedBy = "";
            let getUpdatedBy = "";

            ContactActivityListAppletPR.prototype.Init = function()
            {
                SiebelAppFacade.ContactActivityListAppletPR.superclass.Init.apply(this, arguments);
                this.AttachPMBinding("Created", this.GetField);
                this.AttachPMBinding("Updated", this.GetField);
                this.AttachPMBinding("CreatedBy", this.GetField);
                this.AttachPMBinding("UpdatedBy", this.GetField);
            }

            ContactActivityListAppletPR.prototype.ShowUI = function()
            {
                SiebelAppFacade.ContactActivityListAppletPR.superclass.ShowUI.apply(this, arguments);
            }

            ContactActivityListAppletPR.prototype.BindData = function(bRefresh)
            {
                SiebelAppFacade.ContactActivityListAppletPR.superclass.BindData.apply(this, arguments);
                this.AdditionalInfo();
                this.GetField();
            }

            ContactActivityListAppletPR.prototype.BindEvents = function()
            {
                SiebelAppFacade.ContactActivityListAppletPR.superclass.BindEvents.apply(this, arguments);
            }

            ContactActivityListAppletPR.prototype.EndLife = function()
            {
                SiebelAppFacade.ContactActivityListAppletPR.superclass.EndLife.apply(this, arguments);
            }
			
			ContactActivityListAppletPR.prototype.AdditionalInfo = function()
            {
                const recordSet = this.GetPM().Get("GetRecordSet");
                for (idx in recordSet) 
                {
                    const currentRow = $(`#${this.GetPM().Get("GetPlaceholder")}`).find(`tr[id=${(+idx + 1)}]`);
                    const fieldCreated = recordSet[idx]["Updated"];
                    const fieldCreatedBy = recordSet[idx]["Updated By"];
                    const fieldType = recordSet[idx]["Type"];

                    const iconMap = {
                    "Call - Inbound": "icon-contact-call",
                    "Birthday Call": "icon-calendar",
                    "Appointment": "icon-appointment",
                    "Call": "icon-call",
                    "default": "icon-default",
                    }

                    const iconClass = iconMap[fieldType] ? iconMap[fieldType] : iconMap["default"];

                    const template = `<div id='addinfo' style='margin-left: 35px; width: 1000px; color: #727780'>
                    <tr>
                    <td style='text-align:left;' id='${(+idx+1)}_addinfo_1'><span style='color:blue; cursor:pointer'>Edit</span></td>
                    <td style='text-align:left;' id='${(+idx+1)}_addinfo_2'> &nbsp • &nbsp </td>
                    <td style='text-align:left;' id='${(+idx+1)}_addinfo_3'>${fieldCreatedBy}</td>
                    <td style='text-align:left;' id='${(+idx+1)}_addinfo_4'> &nbsp - &nbsp ${fieldCreated}</td>
                    </tr>
                    </div>`;

                    currentRow.after(template);
                    currentRow.find("td").eq(1).addClass(iconClass);
                    //currentRow.find("td").eq(1).append(`<div class='${iconClass}'></div>`);
                }
				var id = this.GetPM().Get("GetFullId");
                $("div#"+id).find("div.siebui-applet-title").hide();
                const newtitle = document.getElementsByClassName("siebui-applet-title")[2].innerHTML;
                const template2 = `<div id='applettitle' class='cs-applet-title-div'>
                <table>
                <tr>
                <div></div>
                <td id='${id}_new_title'>
                <div class='cs-applet-title'>${newtitle}</div>
                </td>
                </tr>
                </table>
                </div>`;
                $("div#"+id).find("div.siebui-applet-header").before(template2);
                $("div#"+id).find("table.ui-pg-table").hide();
                //const Created
                //const currentRow2 = $(`#${this.GetPM().Get("GetPlaceholder")}`).find(`tr[class='selected-row']`);
                //document.querySelector('#gview_s_1_l')
            }

            ContactActivityListAppletPR.prototype.GetField = function () 
            {
                let PM = this.GetPM();
                getCreated = PM.Get("Created");
                getUpdated = PM.Get("Updated");
                getCreatedBy = PM.Get("CreatedBy");
                getUpdatedBy = PM.Get("UpdatedBy");
                
                console.log('Created => ' + getCreated);
                console.log('Updated => ' + getUpdated);
                console.log('CreatedBy => ' + getCreatedBy);
                console.log('UpdatedBy => ' + getUpdatedBy);
                
                /*let getBottomIdActivities = document.querySelector('#');
                getBottomIdActivities.textContent = 'Activities id: ' + getActivitiesIdvalue;*/
                
            }

            return ContactActivityListAppletPR;
        }());
        return "SiebelAppFacade.ContactActivityListAppletPR";
    })
}
