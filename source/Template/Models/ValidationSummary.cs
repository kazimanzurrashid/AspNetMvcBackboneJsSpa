namespace BackboneTemplate.Models
{
    public class ValidationSummary
    {
        public ValidationSummary()
        {
            Title = "Error!";
            Closable = true;
            Message = "Please correct the following errors.";
        }

        public string Title { get; set; }

        public bool Closable { get; set; }

        public string Message { get; set; }

        public bool ExcludePropertyErrors { get; set; }
    }
}