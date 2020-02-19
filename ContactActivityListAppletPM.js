if (typeof(SiebelAppFacade.ContactActivityListAppletPM) === "undefined")
{
    SiebelJS.Namespace("SiebelAppFacade.ContactActivityListAppletPM");
    define("siebel/custom/ContactActivityListAppletPM", ["siebel/listpmodel"], function()
    {
        SiebelAppFacade.ContactActivityListAppletPM = (function()
        {

            function ContactActivityListAppletPM(pm)
            {
                SiebelAppFacade.ContactActivityListAppletPM.superclass.constructor.apply(this, arguments);
            }

            SiebelJS.Extend(ContactActivityListAppletPM, SiebelAppFacade.ListPresentationModel);

            ContactActivityListAppletPM.prototype.Init = function()
            {
                SiebelAppFacade.ContactActivityListAppletPM.superclass.Init.apply(this, arguments);
                this.AddMethod("InvokeMethod", this.GetFields, { sequence: false, scope: this });
                this.AddMethod("ShowSelection", this.GetFields, { sequence: false, scope: this });

                this.AddProperty("Created", "");
                this.AddProperty("Updated", "");
                this.AddProperty("CreatedBy", "");
                this.AddProperty("UpdatedBy", "");
            }

            ContactActivityListAppletPM.prototype.Setup = function(propSet)
            {
                SiebelJS.Log(`[ContactActivityListAppletPM]: Setup method reached.`);
                SiebelAppFacade.ContactActivityListAppletPM.superclass.Setup.apply(this, arguments);
            }

            ContactActivityListAppletPM.prototype.GetFields = function () 
            {
                let controls = this.Get("GetControls");
                let activitiesId;
                
                for (controlKey in controls) 
                {
                    if (controls[controlKey].GetFieldName() == "Created Date") 
                    {
                        this.SetProperty("Created", this.ExecuteMethod("GetFieldValue", controls[controlKey]));
                    }
                    else if(controls[controlKey].GetFieldName() == "Updated")
                    {
                        this.SetProperty("Updated", this.ExecuteMethod("GetFieldValue", controls[controlKey]));
                    }
                    else if(controls[controlKey].GetFieldName() == "Created By Name")
                    {
                        this.SetProperty("CreatedBy", this.ExecuteMethod("GetFieldValue", controls[controlKey]));
                    }
                    else if(controls[controlKey].GetFieldName() == "Updated By")
                    {
                        this.SetProperty("UpdatedBy", this.ExecuteMethod("GetFieldValue", controls[controlKey]));
                    }
                }
                
            }

            return ContactActivityListAppletPM;
        }());
        return "SiebelAppFacade.ContactActivityListAppletPM";
    })
}